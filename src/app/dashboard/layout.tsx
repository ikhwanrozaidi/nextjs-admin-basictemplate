"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, Bell, Settings, Moon } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import ProfileDropdown from "@/components/ProfileDropdown";
import { AuthCredentials } from "../../../type/auth";
import { getStoredCredentials } from "../../../utils/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [credentials, setCredentials] = useState<AuthCredentials | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle client-side mounting and screen size detection
  useEffect(() => {
    setIsClient(true);

    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // On mobile, keep sidebar closed by default
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        // On desktop, load saved state or default to open
        const savedState = localStorage.getItem("sidebarOpen");
        if (savedState !== null) {
          setIsSidebarOpen(JSON.parse(savedState));
        } else {
          setIsSidebarOpen(true);
        }
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Handle authentication check
  useEffect(() => {
    if (!isClient) return;

    const storedCredentials = getStoredCredentials();
    if (storedCredentials.isEmpty()) {
      router.replace("/signin");
      return;
    }

    setCredentials(storedCredentials);
  }, [isClient, router]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);

    // Only save to localStorage on desktop
    if (isClient && !isMobile) {
      localStorage.setItem("sidebarOpen", JSON.stringify(newState));
    }
  };

  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/order-history":
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

  // Show loading if not authenticated or not mounted
  if (!isClient || !credentials) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Blur Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/20 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isMobile ? "fixed left-0 top-0 h-full z-50" : "relative h-screen"}
          transition-all duration-300 ease-in-out
          ${
            isMobile
              ? isSidebarOpen
                ? "translate-x-0 w-64"
                : "-translate-x-full w-64"
              : isSidebarOpen
              ? "w-64"
              : "w-16"
          }
        `}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden ${
          !isMobile && !isSidebarOpen ? "" : ""
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle sidebar"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Page title - hidden on mobile */}
              <h1 className="hidden md:block text-xl font-semibold text-gray-800">
                {getPageTitle()}
              </h1>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search - hidden on mobile */}
              <div className="hidden lg:block relative">
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

              {/* Desktop-only icons */}
              <button className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-gray-600" />
              </button>

              <button className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>

              {/* Moon icon - always visible */}
              <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                <Moon size={20} className="text-gray-600" />
              </button>

              {/* User profile dropdown - always visible */}
              <ProfileDropdown credentials={credentials} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
