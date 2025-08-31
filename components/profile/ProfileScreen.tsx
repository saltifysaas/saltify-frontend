// components/profile/ProfileScreen.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Editable from './Editable';
import { Camera, Users, UserPlus, MessageSquare, AtSign, Hash, Pencil, Check } from 'lucide-react';
import clsx from 'clsx';

type Profile = {
  id: string;
  salutation?: string | null;
  gender?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  mobile?: string | null;
  alt_contact?: string | null;
  job_title?: string | null;
  role_internal?: string | null;
  signature?: string | null;
  avatar_url?: string | null;
  cover_url?: string | null;
  followers?: number;
  following?: number;
  is_self?: boolean;
  is_following?: boolean;
};

type Props = { userId: string | null };

const SALUTATIONS = [
  { value: 'mr', label: 'Mr' },
  { value: 'ms', label: 'Ms' },
  { value: 'mrs', label: 'Mrs' },
  { value: 'mx', label: 'Mx' },
];

const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'na', label: 'Prefer not to say' },
];

function ProfileSkeleton() {
  return (
    <div className="px-6 py-10">
      <div className="animate-pulse h-40 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
      <div className="mt-4 h-24 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
    </div>
  );
}

export default function ProfileScreen({ userId }: Props) {
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingPic, setSavingPic] = useState<'avatar' | 'cover' | null>(null);
  const [detailsEditing, setDetailsEditing] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    (async () => {
      try {
        const qs = userId ? `?userId=${encodeURIComponent(userId)}` : '';
        const res = await fetch(`/api/profile${qs}`, { headers: { Accept: 'application/json' } });
        const data = (await res.json()) as { profile: Profile };
        setProfile(data.profile);
      } catch {
        setProfile({
          id: 'demo',
          first_name: 'Alex',
          last_name: 'Doe',
          email: 'alex@example.com',
          job_title: 'Growth Lead',
          mobile: '+1 555 123 4567',
          signature: 'Best regards,\nAlex',
          salutation: 'mr',
          gender: 'male',
          avatar_url: '',
          cover_url: '',
          followers: 12,
          following: 7,
          is_self: true,
          is_following: false,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [mounted, userId]);

  const fullName = useMemo(
    () => [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') || 'Unnamed user',
    [profile]
  );

  if (!mounted) return <ProfileSkeleton />;
  if (loading || !profile) return <ProfileSkeleton />;

  async function patch(field: keyof Profile, val: string) {
    const prev = profile;
    const next = { ...profile, [field]: val };
    setProfile(next);
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: val }),
      });
    } catch {
      setProfile(prev);
    }
  }

  async function upload(kind: 'avatar' | 'cover', file: File) {
    const fd = new FormData();
    fd.append('file', file);
    setSavingPic(kind);
    try {
      const res = await fetch(`/api/profile/${kind}`, { method: 'POST', body: fd });
      const { url } = (await res.json()) as { url: string };
      void patch(kind === 'avatar' ? 'avatar_url' : 'cover_url', url);
    } catch {
    } finally {
      setSavingPic(null);
    }
  }

  async function toggleFollow() {
    if (profile.is_self) return;
    const prev = profile;
    const isFollowing = !profile.is_following;
    const followers = Math.max(0, (profile.followers || 0) + (isFollowing ? 1 : -1));
    setProfile({ ...profile, is_following: isFollowing, followers });
    try {
      await fetch('/api/profile/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: profile.id, follow: isFollowing }),
      });
    } catch {
      setProfile(prev);
    }
  }

  return (
    <div className="pb-16" suppressHydrationWarning>
      {/* Cover */}
      <div className="relative h-48 md:h-56 w-full bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-neutral-800 dark:to-neutral-900 overflow-hidden rounded-lg">
        {profile.cover_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.cover_url} alt="cover" className="absolute inset-0 w-full h-full object-cover" />
        )}

        {profile.is_self && (
          <>
            <button
              className="absolute right-3 top-3 z-20 inline-flex items-center gap-2 bg-white/95 dark:bg-neutral-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-sm hover:bg-white"
              onClick={() => coverInputRef.current?.click()}
              disabled={savingPic === 'cover'}
              title="Change cover"
            >
              <Camera className="w-4 h-4" />
              {savingPic === 'cover' ? 'Uploading…' : 'Change cover'}
            </button>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(evt) => {
                const f = evt.target.files?.[0];
                if (f) void upload('cover', f);
                evt.currentTarget.value = '';
              }}
            />
          </>
        )}
      </div>

      {/* Header */}
      <div className="px-6 -mt-8">
        <div className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
          {/* avatar */}
          <div className="absolute -top-8 left-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-lg ring-4 ring-white dark:ring-neutral-900 overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.avatar_url || `https://api.dicebear.com/8.x/shapes/svg?seed=${encodeURIComponent(fullName)}`}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {profile.is_self && (
                <>
                  <button
                    className="absolute -bottom-2 -right-2 grid place-items-center w-7 h-7 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow"
                    onClick={() => avatarInputRef.current?.click()}
                    title="Change photo"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(evt) => {
                      const f = evt.target.files?.[0];
                      if (f) void upload('avatar', f);
                      evt.currentTarget.value = '';
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {/* name + follow */}
          <div className="pl-20">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-lg font-semibold">{fullName}</h1>
              {profile.job_title && <span className="text-sm text-neutral-500">{profile.job_title}</span>}
              {!profile.is_self && (
                <button
                  onClick={toggleFollow}
                  className={clsx(
                    'ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm',
                    profile.is_following
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-white border-neutral-200 hover:bg-neutral-50'
                  )}
                >
                  <UserPlus className="w-4 h-4" />
                  {profile.is_following ? 'Following' : 'Follow'}
                </button>
              )}
            </div>

            <div className="mt-1 flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <strong className="text-neutral-900 dark:text-neutral-100">{profile.followers ?? 0}</strong> Followers
              </span>
              <span>
                <strong className="text-neutral-900 dark:text-neutral-100">{profile.following ?? 0}</strong> Following
              </span>
            </div>
          </div>
        </div>
      </div>

{/* DETAILS: single card with Edit toggle (no overlap) */}
<div className="px-6 mt-6">
  <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
    {/* header row */}
    <div className="flex items-center justify-between mb-3">
      <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Details</div>
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
        onClick={() => setDetailsEditing((v) => !v)}
        title={detailsEditing ? 'Done' : 'Edit'}
      >
        {detailsEditing ? <Check className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
        {detailsEditing ? 'Done' : 'Edit'}
      </button>
    </div>

    {/* fields grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
      <Editable
        label="Salutation"
        type="select"
        value={profile.salutation ?? ''}
        options={SALUTATIONS}
        onSave={(v) => patch('salutation', v)}
        editing={detailsEditing}
      />
      <Editable
        label="Gender"
        type="select"
        value={profile.gender ?? ''}
        options={GENDERS}
        onSave={(v) => patch('gender', v)}
        editing={detailsEditing}
      />
      <Editable label="First name" value={profile.first_name ?? ''} onSave={(v) => patch('first_name', v)} editing={detailsEditing} />
      <Editable label="Last name" value={profile.last_name ?? ''} onSave={(v) => patch('last_name', v)} editing={detailsEditing} />
      <Editable label="Email" type="email" value={profile.email ?? ''} onSave={(v) => patch('email', v)} editing={detailsEditing} />
      <Editable label="Mobile" type="tel" value={profile.mobile ?? ''} onSave={(v) => patch('mobile', v)} editing={detailsEditing} />
      <Editable label="Alternate contact" value={profile.alt_contact ?? ''} onSave={(v) => patch('alt_contact', v)} editing={detailsEditing} />
      <Editable label="Job title" value={profile.job_title ?? ''} onSave={(v) => patch('job_title', v)} editing={detailsEditing} />
      <Editable label="Role (internal)" value={profile.role_internal ?? ''} onSave={(v) => patch('role_internal', v)} editing={detailsEditing} />
      <Editable
        label="Email signature"
        type="textarea"
        value={profile.signature ?? ''}
        onSave={(v) => patch('signature', v)}
        editing={detailsEditing}
      />
    </div>
  </div>
</div>


      {/* Activity + Contact (unchanged) */}
      <div className="px-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <div className="font-medium">Activity</div>
            </div>
            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.avatar_url || `https://api.dicebear.com/8.x/shapes/svg?seed=${encodeURIComponent(fullName)}`}
                    alt="me"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <input
                    placeholder="Share an update…  (use @ to tag, # to topic)"
                    className="w-full bg-transparent border rounded-md px-3 py-2"
                    onFocus={() => alert('Hook this to posts later.')}
                  />
                  <div className="mt-2 flex items-center gap-3 text-xs text-neutral-500">
                    <span className="inline-flex items-center gap-1"><AtSign className="w-3.5 h-3.5" /> Tag</span>
                    <span className="inline-flex items-center gap-1"><Hash className="w-3.5 h-3.5" /> Topic</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 text-sm text-neutral-500">No posts yet. Wire this to your `/api/posts` when ready.</div>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
          <div className="font-medium mb-3">Contact</div>
          <div className="space-y-1 text-sm">
            <div className="text-neutral-500">Email</div>
            <div className="text-neutral-900 dark:text-neutral-100">{profile.email || '—'}</div>
            <div className="text-neutral-500 mt-3">Mobile</div>
            <div className="text-neutral-900 dark:text-neutral-100">{profile.mobile || '—'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
