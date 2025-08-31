'use client';

import Image from 'next/image';
import clsx from 'clsx';

export default function SidebarLogo({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={clsx('m-[2px]', collapsed ? 'w-[75px]' : 'w-[225px]')}>
      <div
        className={clsx(
          'bg-[#00332D] rounded-md flex items-center justify-center text-white',
          collapsed ? 'w-14 h-1 mx-auto' : 'w-[170px] h-14 mx-auto'
        )}
      >
        <Image
          src={collapsed ? '/logo/saltify-icon-trans/2.svg' : '/logo/logo-white.svg'}
          alt="Saltify Logo"
          width={collapsed ? 32 : 120}
          height={24}
          priority
        />
      </div>
    </div>
  );
}
