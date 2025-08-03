// file: components/navigation/SearchBox.tsx
'use client';

export default function SearchBox({ className = '' }: { className?: string }) {
  return (
    <input
      type="text"
      placeholder="Search your asset or feature here"
className={`w-[600px] px-3 py-1.5 text-sm rounded-2xl border 
  bg-white text-[#00332D] placeholder:text-gray-400 
  focus:outline-none 
  border-[#00332d]
  dark:bg-[#f8fffa] dark:text-white dark:placeholder:text-gray-400 dark:border-[#ffffff]
  ${className}`}
    />
  );
}
