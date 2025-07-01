"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  History,
  MessageSquare,
  UserPlus,
  Users,
  User,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      section: "main",
    },
    {
      title: "Order History",
      icon: History,
      href: "/dashboard/order-history",
      section: "main",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "/dashboard/messages",
      section: "main",
    },
  ];

  const registrationItems = [
    {
      title: "Create Staff",
      icon: UserPlus,
      href: "/dashboard/create-staff",
      section: "registrations",
    },
    {
      title: "View Staff Role",
      icon: Users,
      href: "/dashboard/view-staff-role",
      section: "registrations",
    },
  ];

  const helpItems = [
    {
      title: "Create Staff",
      icon: UserPlus,
      href: "/dashboard/help/create-staff",
      section: "help",
    },
    {
      title: "View Staff Role",
      icon: Users,
      href: "/dashboard/help/view-staff-role",
      section: "help",
    },
  ];

  const MenuItem = ({ item, isActive }: { item: any; isActive: boolean }) => (
    <Link
      href={item.href}
      className={`flex items-center py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
          : "text-gray-700 hover:bg-gray-100"
      } ${!isOpen ? "justify-center px-2" : "px-4"}`}
    >
      <item.icon size={20} className="flex-shrink-0" />
      {isOpen && (
        <span className="ml-3 transition-opacity duration-200">
          {item.title}
        </span>
      )}
    </Link>
  );

  return (
    <div className="bg-white shadow-lg h-full flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          {isOpen && (
            <span className="ml-2 font-bold text-gray-800 transition-opacity duration-200">
              ADMINTO
            </span>
          )}
        </div>
      </div>

      {/* User Profile */}
      {isOpen && (
        <div className="flex flex-col items-center p-6 border-b border-gray-200 transition-all duration-200">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-3">
            <User size={24} className="text-gray-600" />
          </div>
          <h3 className="font-medium text-gray-800">John Doe</h3>
          <p className="text-sm text-gray-500">Admin Head</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-6 space-y-6 overflow-y-auto">
        {/* Main Menu */}
        <div>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <MenuItem
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </div>
        </div>

        {/* Registrations */}
        <div>
          {isOpen && (
            <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 transition-opacity duration-200">
              Registrations
            </h3>
          )}
          <div className="space-y-1">
            {registrationItems.map((item) => (
              <MenuItem
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </div>
        </div>

        {/* Help */}
        <div>
          {isOpen && (
            <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 transition-opacity duration-200">
              Help
            </h3>
          )}
          <div className="space-y-1">
            {helpItems.map((item) => (
              <MenuItem
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
