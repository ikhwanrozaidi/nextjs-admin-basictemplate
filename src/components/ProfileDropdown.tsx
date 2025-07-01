"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  ChevronDown,
  Settings,
  HelpCircle,
  Lock,
  LogOut,
  Wallet,
} from "lucide-react";
import { clearCredentials } from "../../utils/auth";
import { AuthCredentials } from "../../type/auth";

interface ProfileDropdownProps {
  credentials: AuthCredentials;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ credentials }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    clearCredentials();
    router.push("/signin");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Extract name from email or use full email
  const displayName = credentials.email?.split("@")[0] || "User";
  const userName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Toggle */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 lg:space-x-3 p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {/* User Avatar */}
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-white" />
        </div>

        {/* User Info - Hidden on mobile */}
        <div className="hidden lg:flex flex-col items-start">
          <span className="text-sm font-medium text-gray-700">{userName}</span>
          <span className="text-xs text-gray-500 truncate max-w-32">
            {credentials.email}
          </span>
        </div>

        {/* Chevron - Hidden on mobile */}
        <ChevronDown
          size={16}
          className={`hidden lg:block text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* Welcome Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h6 className="text-sm font-semibold text-gray-800 mb-0">
              Welcome!
            </h6>
            <p className="text-xs text-gray-500 truncate">
              {credentials.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {/* My Account */}
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <User size={16} className="mr-3 text-gray-400" />
              <span>My Account</span>
            </button>

            {/* Wallet */}
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <Wallet size={16} className="mr-3 text-gray-400" />
              <span>Wallet: </span>
              <span className="ml-1 font-semibold">$89.25k</span>
            </button>

            {/* Settings */}
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <Settings size={16} className="mr-3 text-gray-400" />
              <span>Settings</span>
            </button>

            {/* Support */}
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <HelpCircle size={16} className="mr-3 text-gray-400" />
              <span>Support</span>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-1"></div>

          {/* Bottom Section */}
          <div className="py-1">
            {/* Lock Screen */}
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <Lock size={16} className="mr-3 text-gray-400" />
              <span>Lock Screen</span>
            </button>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
            >
              <LogOut size={16} className="mr-3 text-red-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
