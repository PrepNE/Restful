import { CarOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import LinkButton from "antd/es/typography/Link";
import useAuth from "@/hooks/useAuth";
import Logo from "./Logo";

const Sidebar = () => {
  const location = useLocation();
  const { logout} = useAuth();

  const pageDirectories = [
    {
      id: 1,
      name: "Overview",
      path: "/dashboard",
      icon: <HomeOutlined />,
    },
    {
      id: 2,
      name: "Slots",
      path: "/dashboard/slots",
      icon: <CarOutlined />,
    },
  ];

  const isActive = (path: string) => {
    console.log("The path is: ", location.pathname, location.pathname === path);
    return location.pathname === path;
  };
  return (
    <div className="relative flex flex-1 flex-col min-h-0 border-r pt-0 bg-white">
      <div className="flex flex-1 flex-col pt-5 pb-4 overflow-auto">
        <div className="flex-1 space-x-3 divide-y space-y-1">
          <ul className="space-y-1 flex-1 flex-col h-5/6 pb-2">
            <li className="pb-4">
              <Link to={"/"} className="font-bold flex items-center lg:ml-2.5">
                <Logo />
              </Link>
            </li>

            {pageDirectories.map((route, idx) => (
              <Link
                key={idx}
                to={route.path}
                className={`${
                  isActive(route.path)
                    ? "bg-primary  border border-white border-dashed text-white font-medium text-md"
                    : ""
                } text-base  font-normal rounded-lg hover:text-black hover:bg-blue-200 duration-300 flex items-center p-2 group`}
              >
                {route.icon}
                <span className="ml-3 flex-1 whitespace-nowrap">
                  {route.name}
                </span>
              </Link>
            ))}
          </ul>

          <div className="space-y-2 p-2 z-10">
            <LinkButton onClick={logout}>
              <LogoutOutlined />
              <span className="ml-3 text-base text-primary whitespace-nowrap">
                Logout
              </span>
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
