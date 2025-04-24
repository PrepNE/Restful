import { CheckSquareOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { Typography } from "antd";
import useAuth from "@/hooks/useAuth";
import { useLocation} from "react-router-dom";

const Sidebar = () => {
  const { Text } = Typography;
  const { logout } = useAuth();
  const location = useLocation();

  const pageDirectories = [
    {
      id: 1,
      name: "Overview",
      path: "/dashboard",
      icon: <HomeOutlined />,
    },
    {
      id: 1,
      name: "Elections",
      path: "/dashboard/election",
      icon: <CheckSquareOutlined />,
    },
  ];

  const handleLogOut = () => {
    logout();
  };

  const isActive = (path: string) => {
    return (location.pathname === path);
  };
  return (
    <aside className="relative flex flex-1 flex-col min-h-0 border-r  pt-0 bg-white">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex-1 px-3  divide-y space-y-1 ">
          <ul className="space-y-1 flex-1 flex-col flex h-5/6 pb-2">
            <li className="pb-4">
              <Link href="/" className="font-bold flex items-center lg:ml-2.5">
                <img
                  src="/logo.png"
                  className="h-10 mr-2"
                  alt="Windster Logo"
                />
                <Text className="self-center whitespace-nowrap text-xl">
                  <Text className="text-primary text-2xl">E</Text>-Vote
                </Text>
              </Link>
            </li>
            {pageDirectories.map((route, idx) => (
                <Link key={idx} href={route.path} className={`${isActive(route.path) ? "bg-primary border border-white border-dashed text-white font-medium text-md" : ""} text-base text-gray-900 font-normal rounded-lg hover:text-black hover:bg-green-200 duration-300 flex items-center p-2 group`}>
                    {route.icon}
                  <span className='ml-3 flex-1 whitespace-nowrap'>{
                    route.name
                  }</span>
                </Link>
            ))}
          </ul>
          <div className="space-y-2 pt-2 h-1/6">
            <Link onClick={handleLogOut} className='text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group '>
              <LogoutOutlined />
              <span className='ml-3 flex-1 whitespace-nowrap'>Log out</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
