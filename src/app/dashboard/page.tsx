// Canvas created for Dashboard Page (Form Builder UI)

"use client";

import { useState, useEffect, useRef } from "react";
import StarterGrid from "@/components/ui/StarterGrid";
import CreateFormModal from "@/components/forms/CreateFormModal";
import DarkModeToggle from "@/components/DarkModeToggle";
import {
  ChevronDownIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  X
} from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardHome() {
  const [showAppMenu, setShowAppMenu] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(["Create Page", "Responses"]);
  const [recent] = useState<string[]>([
    "Create Page", "Responses", "Branding", "LeadPages", "Automations",
    "Settings", "Forms", "Editor", "Overview"
  ]);
  const [collapsed, setCollapsed] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showCreateFormModal, setShowCreateFormModal] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const createMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (createMenuRef.current && !createMenuRef.current.contains(event.target as Node)) {
        setShowCreateMenu(false);
        setShowAppMenu(false);
        setShowMoreDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFavorite = (item: string) => {
    setFavorites((prev) => {
      if (prev.includes(item)) return prev.filter((f) => f !== item);
      if (prev.length >= 25) return prev;
      return [...prev, item];
    });
  };

  return (
    <div className="min-h-screen bg-lightBase text-textDark dark:bg-[#CBDDD1] dark:text-white relative">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200 sticky top-0 z-50 w-full dark:border-[#14532D]">
        <Image
          src="/logo/logo-green.svg"
          alt="Saltify Logo"
          width={140}
          height={32}
          priority
          className="dark:hidden"
        />
        <Image
          src="/logo/logo-white.svg"
          alt="Saltify Logo"
          width={140}
          height={32}
          priority
          className="hidden dark:block"
        />

        {/* Favorites */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-[50%]">
          {favorites.slice(0, 4).map((item) => (
            <div key={item} className="relative group">
              <button
                onClick={() => alert(`Viewing recent ${item}`)}
                className="px-2 py-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#1f332e] flex items-center gap-1 text-black dark:text-white"
              >
                {item}
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}

          {/* More Dropdown */}
          {favorites.length > 4 && (
            <div className="relative">
              <button
                className="px-3 py-1 flex items-center gap-1 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-[#1f332e]"
                onClick={() => setShowMoreDropdown((prev) => !prev)}
              >
                More <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </button>
              {showMoreDropdown && (
                <div className="absolute top-full mt-2 left-0 bg-white dark:bg-[#1f332e] border border-gray-200 dark:border-[#2c4b41] shadow-md rounded-md z-50 w-48 max-h-64 overflow-auto">
                  {favorites.slice(4).map((item) => (
                    <div
                      key={item}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#345a4f] cursor-pointer flex items-center justify-between"
                      onClick={() => alert(`Navigating to ${item}`)}
                    >
                      <span>{item}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFavorites((prev) => prev.filter((f) => f !== item));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search + Create + App Launcher */}
        <div className="flex items-center gap-4 relative" ref={createMenuRef}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 text-sm border rounded-md outline-none focus:ring w-48"
          />

          <button
            onClick={() => setShowCreateMenu(!showCreateMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold border transition bg-[#00332D] text-white border-[#00332D] hover:bg-[#002721] dark:bg-white dark:text-[#00332D] dark:border-white dark:hover:bg-gray-100"
          >
            <Plus className="w-4 h-4" />
            Create
          </button>

          {showCreateMenu && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-[#1f332e] border border-gray-200 dark:border-[#2c4b41] rounded-md shadow-md z-50 w-48 max-h-64 overflow-auto">
              {recent.map((app) => (
                <div
                  key={app}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#345a4f] cursor-pointer flex justify-between items-center"
                  onClick={() => {
                    if (app === "Forms") setShowCreateFormModal(true);
                    else router.push(`/${app.toLowerCase().replace(/\s+/g, "-")}`);
                    setShowCreateMenu(false);
                  }}
                >
                  {app}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(app);
                    }}
                    className="text-blue-500"
                  >
                    {favorites.includes(app) ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* App Launcher */}
          <div className="relative">
            <button
              onClick={() => setShowAppMenu(!showAppMenu)}
              className="w-10 h-10 grid place-content-center border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-[#00332D]"
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-[2px]">
                {[...Array(9)].map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#00332D] dark:bg-white"
                  />
                ))}
              </div>
            </button>

            {showAppMenu && (
              <div className="absolute top-12 right-0 bg-white dark:bg-[#1f332e] border border-gray-200 dark:border-[#2c4b41] rounded-md shadow-md z-50 w-48">
                {recent.map((app) => (
                  <div
                    key={app}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#345a4f] cursor-pointer flex justify-between items-center"
                    onClick={() => {
                      router.push(`/${app.toLowerCase().replace(/\s+/g, "-")}`);
                      setShowAppMenu(false);
                    }}
                  >
                    {app}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(app);
                      }}
                      className="text-blue-500"
                    >
                      {favorites.includes(app) ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Form Modal */}
      {showCreateFormModal && <CreateFormModal onClose={() => setShowCreateFormModal(false)} />}

      {/* Main Layout */}
      <div className="flex flex-1 h-[calc(100vh-88px)]">
        <aside className={clsx(
          "border-r border-gray-200 dark:border-[#14532D] flex-shrink-0 flex flex-col justify-between transition-all duration-200 h-full overflow-y-auto",
          collapsed ? "w-35" : "w-56",
          "bg-white dark:bg-[#00332D]"
        )}>
          <ul className="space-y-1 px-4 mt-4 mb-2">
            {recent.slice(0, 10).map((item) => (
              <li
                key={item}
                className="text-sm hover:bg-gray-100 dark:hover:bg-[#1f332e] px-3 py-2 rounded-md cursor-pointer flex items-center text-gray-800 dark:text-white"
              >
                {collapsed ? (
                  <span className="w-10 h-10 rounded-md border border-[#00332D] text-[#00332D] text-sm font-semibold flex items-center justify-center bg-white" title={item}>
                    {item.slice(0, 2)}
                  </span>
                ) : item}
              </li>
            ))}
          </ul>

          <div className="px-4 py-3 border-t border-gray-200 dark:border-[#2c4b41]">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[#00332D] dark:text-white hover:text-green-800 dark:hover:text-green-200 cursor-pointer">
                <Settings className="w-5 h-5" />
                {!collapsed && <span className="text-sm">Settings</span>}
              </div>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto bg-lightBase text-textLight dark:bg-[#CBDDD1] dark:text-white">
          <StarterGrid onFormTileClick={() => setShowCreateFormModal(true)} />
        </main>
      </div>

      {/* Dark Mode Toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <DarkModeToggle />
      </div>
    </div>
  );
}
