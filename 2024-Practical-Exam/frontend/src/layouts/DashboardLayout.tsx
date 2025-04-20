import Sidebar from "@/components/shared/Sidebar";
import useAuth from "@/hooks/useAuth";
import {
  formatAvatarInitials,
  formatPathname,
  formatUsername,
} from "@/lib/utils";
import { MenuOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const { Text } = Typography;
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar on route change for mobile
  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  // Handle resize events and close sidebar on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial load
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )} 
      
      <aside
        className={`fixed flex lg:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex-shrink-0 overflow-y-auto`}
      >
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="p-2 text-gray-600 rounded-md lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-label="Toggle sidebar"
              >
                <MenuOutlined />
              </button>
              <Text className="text-base font-medium truncate">
                {formatPathname(location.pathname)}
              </Text>
            </div>
            
            <div className="flex items-center px-3 py-2 space-x-3 bg-gray-100 rounded-xl">
              <div className="flex-col hidden sm:flex items-end">
                <h1 className="text-sm font-medium">{formatUsername(user?.firstName, user?.lastName)}</h1>
                <p className="text-xs text-gray-400 truncate max-w-[150px]">{user?.email}</p>
              </div>
              <Avatar className="bg-green-600 text-white flex-shrink-0">
                {formatAvatarInitials(user?.firstName, user?.lastName)}
              </Avatar>
            </div>
          </div>
        </header>

        <div className="pt-12 md:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;