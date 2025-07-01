"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Bell, Settings, Moon } from "lucide-react";
import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    const savedState = localStorage.getItem("sidebarOpen");
    if (savedState !== null) {
      setIsSidebarOpen(JSON.parse(savedState));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    if (isClient) {
      localStorage.setItem("sidebarOpen", JSON.stringify(newState));
    }
  };

  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/draft/order-history":
        return "Order History";
      case "/dashboard/messages":
        return "Messages";
      case "/dashboard/create-staff":
        return "Create Staff";
      case "/dashboard/view-staff-role":
        return "View Staff Role";
      case "/dashboard/help/create-staff":
        return "Help - Create Staff";
      case "/dashboard/help/view-staff-role":
        return "Help - View Staff Role";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Fixed and persistent */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* Main Content Area - Only this changes */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Fixed and persistent */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h1 className="text-xl font-semibold text-gray-800 transition-all duration-200">
                {getPageTitle()}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Icons */}
              <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                <Moon size={20} className="text-gray-600" />
              </button>

              {/* User */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">John Doe</span>
              </div>
              <button
                // onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Page Content - This is where page transitions happen */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6 transition-all duration-200">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
