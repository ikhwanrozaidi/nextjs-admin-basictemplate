"use client";

import React from "react";
import { Menu, X, Search, Bell, Settings, Moon, AlignLeft } from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";
import { AuthCredentials } from "../../type/auth";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  pageTitle: string;
  credentials: AuthCredentials;
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({
  isSidebarOpen,
  toggleSidebar,
  pageTitle,
  credentials,
  isMobile,
}) => {
  return (
    <div className="px-4 lg:px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <AlignLeft size={20} className="text-gray-600" />
            ) : (
              <Menu size={20} className="text-gray-600" />
            )}
          </button>
          <h1 className="hidden md:block text-xl font-semibold text-gray-800">
            {pageTitle}
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="hidden lg:block relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <button className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Moon size={20} className="text-gray-600" />
          </button>
          <ProfileDropdown credentials={credentials} />
        </div>
      </div>
    </div>
  );
};

export default Header;
