'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Sparkles, Check, Loader2, Rocket, CloudCog, Clock, Zap, Shield } from 'lucide-react';

export default function AutomationLoadingPage({
  title = 'Building your automation…',
  subtitle = 'We are wiring triggers, actions & policies for you.',
  steps = ['Bootstrapping', 'Validating', 'Wiring', 'Securing', 'Publishing'],
  percent: percentProp,
  currentStep: currentStepProp,
  auto = true,
}: {
  title?: string;
  subtitle?: string;
  steps?: string[];
  percent?: number;
  currentStep?: number;
  auto?: boolean;
}) {
  const [percent, setPercent] = useState(percentProp ?? 0);
  const [currentStep, setCurrentStep] = useState(currentStepProp ?? 0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!auto) return;
    const start = performance.now();
    const drive = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(100, 5 + elapsed / 40); // ~4s to 100
      setPercent(p);
      const idx = Math.min(steps.length - 1, Math.floor((p / 100) * steps.length));
      setCurrentStep(idx);
      if (p < 100) raf.current = requestAnimationFrame(drive);
    };
    raf.current = requestAnimationFrame(drive);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [auto, steps.length]);

  useEffect(() => { if (percentProp !== undefined) setPercent(percentProp); }, [percentProp]);
  useEffect(() => { if (currentStepProp !== undefined) setCurrentStep(currentStepProp); }, [currentStepProp]);

  const nicePercent = Math.round(percent);
  const done = nicePercent >= 100;
  const icons = [Rocket, CloudCog, Shield, Zap, Clock, Sparkles];

  return (
    <div className="relative min-h-[calc(100vh-2rem)] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-[#0B1320] dark:to-[#0A0F1A] p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)',
          color: 'rgb(2 44 34)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      />
      <FlowWires />

      <div className="relative mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-gray-200/70 bg-white/80 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="flex items-start justify-between gap-4 p-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight">{title}</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300/80">{subtitle}</p>
          </div>
          <Badge state={done ? 'success' : 'running'}>{done ? 'Ready' : 'Running'}</Badge>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-5">
          <div className="md:col-span-2">
            <RingProgress percent={nicePercent} />
            <div className="mt-4 grid grid-cols-3 gap-3">
              {['Triggers', 'Actions', 'Policies'].map((label, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <div key={label} className="flex items-center gap-2 rounded-xl border border-gray-200/70 bg-white/70 px-3 py-2 text-xs text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
                    <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-3">
            <ol className="space-y-2">
              {steps.map((s, i) => (
                <li
                  key={s}
                  className={[
                    'flex items-center justify-between gap-3 rounded-xl border px-4 py-3 shadow-sm',
                    'border-gray-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5',
                    i < currentStep ? 'opacity-80' : i === currentStep ? 'ring-1 ring-emerald-500/40' : 'opacity-60',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <StepBullet state={i < currentStep ? 'done' : i === currentStep ? 'active' : 'idle'} />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{s}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {i < currentStep ? 'Completed' : i === currentStep ? 'In progress' : 'Queued'}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Overall progress</span>
                <span>{nicePercent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200/70 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-[width] duration-300 ease-out dark:bg-emerald-500"
                  style={{ width: `${nicePercent}%` }}
                />
              </div>
            </div>

            <EventLog percent={nicePercent} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ state, children }: { state: 'running' | 'success'; children: React.ReactNode }) {
  const cls =
    state === 'success'
      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20'
      : 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20';
  const Icon = state === 'success' ? Check : Loader2;
  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1 ${cls}`}>
      <Icon className={`h-3.5 w-3.5 ${state === 'success' ? '' : 'animate-spin-slow'}`} />
      {children}
    </div>
  );
}

function StepBullet({ state }: { state: 'idle' | 'active' | 'done' }) {
  if (state === 'done') {
    return (
      <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-600 text-white">
        <Check className="h-4 w-4" />
      </span>
    );
  }
  if (state === 'active') {
    return (
      <span className="relative h-6 w-6">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/40" />
        <span className="absolute inset-1 grid place-items-center rounded-full bg-emerald-600 text-white">
          <Sparkles className="h-4 w-4" />
        </span>
      </span>
    );
  }
  return <span className="h-6 w-6 rounded-full border border-gray-300 dark:border-white/15" />;
}

function RingProgress({ percent }: { percent: number }) {
  const p = Math.max(0, Math.min(100, percent));
  const angle = (p / 100) * 360;
  return (
    <div className="relative mx-auto grid aspect-square w-56 place-items-center">
      <div
        className="absolute inset-0 rounded-[28px] bg-[conic-gradient(var(--ring-color)_var(--angle),_transparent_0)] p-1.5 [--ring-color:theme(colors.emerald.500)] dark:[--ring-color:theme(colors.emerald.400)]"
        style={{ ['--angle' as any]: `${angle}deg` }}
      >
        <div className="h-full w-full rounded-[22px] bg-white/90 backdrop-blur dark:bg-white/5" />
      </div>
      <div className="relative z-10 text-center">
        <div className="text-4xl font-semibold text-gray-900 dark:text-gray-50">{Math.round(p)}%</div>
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">Compiling your flow</div>
      </div>
    </div>
  );
}

function EventLog({ percent }: { percent: number }) {
  const messages = useMemo(
    () => [
      'Resolving dependencies…',
      'Generating secrets vault…',
      'Negotiating connector scopes…',
      'Optimizing execution graph…',
      'Seeding test run…',
      'Publishing artifact…',
    ],
    []
  );
  const visibleCount = Math.min(messages.length, Math.max(1, Math.floor((percent / 100) * messages.length)));
  return (
    <div className="mt-6 rounded-xl border border-gray-200/70 bg-white/70 p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
        <Clock className="h-4 w-4" /> Live log
      </div>
      <ul className="max-h-28 space-y-1 overflow-hidden text-xs text-gray-600 dark:text-gray-300">
        {messages.slice(0, visibleCount).map((m, i) => (
          <li key={i} className="truncate">• {m}</li>
        ))}
        {percent < 100 && (
          <li className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Working…
          </li>
        )}
        {percent >= 100 && <li className="text-emerald-600 dark:text-emerald-400">✔ Completed successfully</li>}
      </ul>
    </div>
  );
}

function FlowWires() {
  return (
    <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(16,185,129,0)" />
          <stop offset="50%" stopColor="rgba(16,185,129,0.35)" />
          <stop offset="100%" stopColor="rgba(16,185,129,0)" />
        </linearGradient>
        <linearGradient id="g2" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="rgba(59,130,246,0)" />
          <stop offset="50%" stopColor="rgba(59,130,246,0.28)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </linearGradient>
      </defs>
      <path d="M0 80 C 200 120, 300 20, 600 80 S 1000 140, 1200 80" fill="none" stroke="url(#g1)" strokeWidth="3">
        <animate attributeName="stroke-dasharray" values="0,2000;300,2000;0,2000" dur="5s" repeatCount="indefinite" />
        <animate attributeName="stroke-dashoffset" values="0;-600" dur="5s" repeatCount="indefinite" />
      </path>
      <path d="M0 520 C 220 480, 420 560, 700 500 S 950 440, 1200 520" fill="none" stroke="url(#g2)" strokeWidth="2.5">
        <animate attributeName="stroke-dasharray" values="0,2000;240,2000;0,2000" dur="6s" repeatCount="indefinite" />
        <animate attributeName="stroke-dashoffset" values="0;-500" dur="6s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}
