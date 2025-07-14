"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Component */}
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          pageTitle={getPageTitle()}
          credentials={credentials}
          isMobile={isMobile}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
