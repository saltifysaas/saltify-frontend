// components/navigation/topnavigation/TopNavigationBar.tsx
'use client';

import SearchBox from '@/components/navigation/topnavigation/SearchBox';
import GlobalCreateButton from '@/components/navigation/GlobalCreateButton';
import HelpIcon from '@/components/navigation/HelpIcon';
import NotificationIcon from '@/components/navigation/topnavigation/NotificationIcon';
import ProfileIcon from '@/components/navigation/topnavigation/ProfileIcon';
import clsx from 'clsx';

export default function TopNavigationBar() {
  // NOTE: `group` is required so children can use group-hover:*
  const actionBox =
    'group w-9 h-9 grid place-items-center rounded-md cursor-pointer hover:bg-ui-hoverBG dark:hover:bg-ui-hoverBGDark';
  const iconCls = 'w-6 h-6 text-[#00332D] dark:text-white';

  return (
    // No bg/rounded/border/margins here — parent wrapper handles the card look & exact height
    <header className="h-full w-full box-border flex items-center justify-between px-8">
      <div className="flex-1 flex justify-center">
        <SearchBox className="w-full max-w-[700px]" />
      </div>

      <div className="flex items-center gap-2 pl-2">
        <div className={actionBox} title="Create">
          <div className="scale-[0.9] font-bold">
            <GlobalCreateButton />
          </div>
        </div>

        <div className={actionBox} title="Help">
          <HelpIcon className={iconCls} />
        </div>

        <div className={actionBox} title="Notifications">
          <NotificationIcon className={iconCls} />
        </div>

        <div className={actionBox} title="Account">
          <ProfileIcon className={clsx(iconCls)} />
        </div>
      </div>
    </header>
  );
}
