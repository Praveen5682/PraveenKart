import { Outlet } from "react-router-dom";
import SideBar from "../components/AdminPanelComponents/SideBar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <SideBar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
