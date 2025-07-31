"use client";

import { useState, useEffect, useRef } from "react";
import StarterGrid from "@/components/ui/StarterGrid";
import {
  ChevronDownIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  User
} from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const [showAppMenu, setShowAppMenu] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(["Create Page", "Responses"]);
  ([
    "Create Page",
    "Responses",
    "Branding",
    "LeadPages",
    "Automations",
    "Settings",
    "Forms",
    "Editor",
    "Overview"
  ]);
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const createMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (createMenuRef.current && !createMenuRef.current.contains(event.target as Node)) {
        setShowCreateMenu(false);
        setShowAppMenu(false);
        setShowMoreDropdown(false);
        setShowProfileDropdown(false);
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
    <div className={clsx("min-h-screen text-[#111827]", isDarkMode ? "bg-white" : "bg-white")}>      
      {/* Top Navigation Bar */}
      <div className={clsx(
        "flex items-center justify-between px-4 py-6 border-b border-gray-200 sticky top-0 z-50 w-full",
        isDarkMode ? "bg-[#00332D]" : "bg-white"
      )}>
        {/* Left: Saltify Logo */}
        <div className="flex items-center gap-4">
          <img
            src={isDarkMode ? "/logo/logo-white.svg" : "/logo/logo-green.svg"}
            alt="Saltify Logo"
            className="h-8"
          />
        </div>

        {/* Center: Shortcuts */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-[50%]">
          {favorites.slice(0, 4).map((item) => (
            <div key={item} className="relative group">
              <button className={clsx(
                  "px-2 py-1 text-sm font-medium hover:bg-gray-100 flex items-center gap-1",
                  isDarkMode ? "text-white" : "text-gray-800"
                )}
                onClick={() => alert(`Viewing recent ${item}`)}
              >
                {item}
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
          {favorites.length > 4 && (
            <div className="relative">
              <button
                className="px-3 py-1 flex items-center gap-1 text-sm font-medium rounded hover:bg-gray-100"
                onClick={() => setShowMoreDropdown((prev) => !prev)}
              >
                More <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </button>
              {showMoreDropdown && (
                <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 shadow-md rounded-md z-50 w-48">
                  {favorites.slice(4).map((item) => (
                    <div
                      key={item}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
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

        {/* Right: Search + Create + App Launcher + Profile */}
        <div className="flex items-center gap-4 relative" ref={createMenuRef}>
          {/* 🔍 Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 text-sm border rounded-md outline-none focus:ring w-48"
          />

          {/* Create Button */}
          <div className="relative">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className={clsx(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold border transition",
                isDarkMode
                  ? "bg-white text-[#00332D] border-white hover:bg-gray-100"
                  : "bg-[#00332D] text-white border-[#00332D] hover:bg-[#002721]"
              )}
            >
              <Plus className="w-4 h-4" />
              Create
            </button>
            {showCreateMenu && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md z-50 w-48">
                {["Form", "Landing Page", "E-sign", "Product Page", "AI Agent", "HTML Email", "Dashboard"].map((label) => (
                  <div
                    key={label}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      router.push(`/${label.toLowerCase().replace(/\s+/g, "-")}`);
                      setShowCreateMenu(false);
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* App Launcher */}
          <div className="relative">
            <button
              onClick={() => setShowAppMenu(!showAppMenu)}
              className={clsx(
                "w-10 h-10 grid place-content-center border border-gray-300 rounded-md hover:bg-gray-100",
                isDarkMode ? "bg-[#00332D]" : ""
              )}
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-[2px]">
                {[...Array(9)].map((_, i) => (
                  <span
                    key={i}
                    className={clsx(
                      "w-1.5 h-1.5 rounded-full",
                      isDarkMode ? "bg-white" : "bg-[#00332D]"
                    )}
                  />
                ))}
              </div>
            </button>
            {showAppMenu && (
              <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-md shadow-md z-50 w-48">
                {recent.map((app) => (
                  <div
                    key={app}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={() => {
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

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className={clsx(
                "w-10 h-10 flex items-center justify-center rounded-full border border-gray-300",
                isDarkMode ? "bg-[#00332D] text-white" : "text-[#00332D]"
              )}
            >
              <User className="w-5 h-5" />
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md z-50">
                {[
                  { label: "Create Login PIN", action: () => alert("Create PIN") },
                  { label: "Logout", action: () => alert("Logging out") },
                  { label: "Profile", action: () => alert("View Profile") }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={item.action}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 h-[calc(100vh-88px)]">
        {/* Sidebar */}
        <aside
          className={clsx(
            "border-r border-gray-200 flex-shrink-0 flex flex-col justify-between transition-all duration-200 h-full overflow-y-auto",
            collapsed ? "w-35" : "w-56",
            isDarkMode ? "bg-[#00332D]" : "bg-white"
          )}
        >
          <ul className="space-y-1 px-4 mt-4 mb-2">
            {recent.slice(0, 10).map((item) => (
              <li
                key={item}
                className={clsx(
                  "text-sm hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer flex items-center",
                  isDarkMode ? "text-white" : "text-gray-800"
                )}
              >
                {collapsed ? (
                  <span
                    className="w-10 h-10 rounded-md border border-[#00332D] text-[#00332D] text-sm font-semibold flex items-center justify-center bg-white"
                    title={item}
                  >
                    {item.slice(0, 2)}
                  </span>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>

          {/* Sidebar Footer */}
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between gap-2">
              <div
                className={clsx(
                  "flex items-center gap-2 cursor-pointer",
                  isDarkMode
                    ? "text-white hover:text-green-200"
                    : "text-[#00332D] hover:text-green-800"
                )}
              >
                <Settings className="w-5 h-5" />
                {!collapsed && <span className="text-sm">Settings</span>}
              </div>

              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-gray-500 hover:text-gray-800"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 p-6 bg-[#ffffff] overflow-y-auto">
          <StarterGrid />
        </main>
      </div>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={clsx(
          "fixed bottom-4 right-4 px-4 py-2 rounded-2xl text-sm font-semibold shadow-md transition-all duration-200 z-50",
          isDarkMode ? "bg-white text-[#00332D]" : "bg-[#00332D] text-white"
        )}
      >
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}
