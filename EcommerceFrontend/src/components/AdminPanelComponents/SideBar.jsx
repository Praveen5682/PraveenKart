import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import {
  FaChartBar,
  FaShoppingCart,
  FaBoxes,
  FaFolderOpen,
  FaLayerGroup,
  FaTags,
  FaClipboardList,
  FaUsers,
  FaComments,
  FaEnvelope,
  FaMoneyBillWave,
  FaChartLine,
  FaUndo,
  FaGift,
  FaBullhorn,
  FaStar,
  FaUserShield,
  FaUserTie,
  FaLock,
  FaCog,
  FaGlobe,
  FaTruck,
  FaBell,
  FaHeadset,
  FaQuestionCircle,
  FaPhone,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ onLogout }) => {
  return (
    <div className="w-72 bg-white text-gray-900 shadow-lg h-screen p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {/* Logo */}
      <div className="flex items-center space-x-3 px-3 py-4 border-b">
        <h2 className="text-3xl font-bold tracking-wide text-gray-800">
          Praveen Kart
        </h2>
      </div>

      {/* Dashboard */}
      <h3 className="text-sm font-bold text-gray-500 px-4 pt-5 pb-2 uppercase">
        Dashboard
      </h3>
      <ul>
        <li>
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-3 text-lg font-medium text-gray-700 rounded-lg hover:text-blue-600 hover:bg-gray-200 transition"
          >
            <FaChartBar className="mr-3 text-gray-600 text-lg" />
            Overview
          </Link>
        </li>
      </ul>

      {/* Management */}
      <h3 className="text-sm font-bold text-gray-500 px-4 pt-5 pb-2 uppercase">
        Management
      </h3>
      <ul>
        {/* Products Dropdown */}
        <DropdownMenu
          title="Products"
          icon={<FaShoppingCart className="mr-3 text-gray-600 text-lg" />}
          menuItems={[
            {
              to: "/dashboard/all-products",
              label: "All Products",
              Icon: FaBoxes,
            },
            {
              to: "/dashboard/add-product",
              label: "Add Product",
              Icon: FaShoppingCart,
            },
            {
              to: "/dashboard/categories",
              label: "Categories",
              Icon: FaFolderOpen,
            },
            {
              to: "/dashboard/sub-categories",
              label: "Sub-Categories",
              Icon: FaLayerGroup,
            },
            {
              to: "/dashboard/specifications",
              label: "Attributes & Specs",
              Icon: FaTags,
            },
          ]}
        />

        {/* Orders Dropdown */}
        <DropdownMenu
          title="Orders"
          icon={<FaClipboardList className="mr-3 text-gray-600 text-lg" />}
          menuItems={[
            { to: "/dashboard/all-orders", label: "All Orders", Icon: FaBoxes },
            {
              to: "/dashboard/pending-orders",
              label: "Pending Orders",
              Icon: FaClipboardList,
            },
            {
              to: "/dashboard/completed-orders",
              label: "Completed Orders",
              Icon: FaFolderOpen,
            },
            {
              to: "/dashboard/cancelled-orders",
              label: "Cancelled Orders",
              Icon: FaLayerGroup,
            },
          ]}
        />
        <DropdownMenu
          title="Customers "
          icon={<FaClipboardList className="mr-3 text-gray-600 text-lg" />}
          menuItems={[
            {
              to: "/dashboard/all-orders",
              label: "All Customers",
              Icon: FaBoxes,
            },
            {
              to: "/dashboard/pending-orders",
              label: "Customer Reviews",
              Icon: FaClipboardList,
            },
          ]}
        />
        <DropdownMenu
          title="Reports "
          icon={<FaClipboardList className="mr-3 text-gray-600 text-lg" />}
          menuItems={[
            {
              to: "/dashboard/all-orders",
              label: "Sales Reports",
              Icon: FaBoxes,
            },
            {
              to: "/dashboard/pending-orders",
              label: "Revenue Analytics",
              Icon: FaClipboardList,
            },
            {
              to: "/dashboard/pending-orders",
              label: "Refund & Returns Report",
              Icon: FaClipboardList,
            },
          ]}
        />
        <DropdownMenu
          title="Marketings "
          icon={<FaClipboardList className="mr-3 text-gray-600 text-lg" />}
          menuItems={[
            {
              to: "/dashboard/all-orders",
              label: "Coupons & Discounts",
              Icon: FaBoxes,
            },
            {
              to: "/dashboard/banner",
              label: "Banners & Advertisements",
              Icon: FaClipboardList,
            },
            {
              to: "/dashboard/pending-orders",
              label: "Best Selling Products",
              Icon: FaClipboardList,
            },
            {
              to: "/dashboard/pending-orders",
              label: "Featured Products",
              Icon: FaClipboardList,
            },
          ]}
        />
        <DropdownMenu
          title="User Roles  "
          icon={<FaClipboardList className="mr-3 text-gray-600 text-lg" />}
          menuItems={[
            {
              to: "/dashboard/all-orders",
              label: "Admin Users",
              Icon: FaBoxes,
            },
            {
              to: "/dashboard/pending-orders",
              label: "Staff Management",
              Icon: FaClipboardList,
            },
            {
              to: "/dashboard/pending-orders",
              label: "Roles & Permissions",
              Icon: FaClipboardList,
            },
          ]}
        />

        {/* Settings Dropdown */}
        <DropdownMenu
          title="Settings"
          icon={<FaCog className="mr-3 text-gray-600 text-lg" />}
          menuItems={[
            {
              to: "/dashboard/settings",
              label: "General Settings",
              Icon: FaCog,
            },
            {
              to: "/dashboard/currency",
              label: "Currency & Payments",
              Icon: FaGlobe,
            },
            {
              to: "/dashboard/shipping",
              label: "Shipping Settings",
              Icon: FaTruck,
            },
            {
              to: "/dashboard/notifications",
              label: "Notifications & Alerts",
              Icon: FaBell,
            },
          ]}
        />
      </ul>

      {/* Logout */}
      <div className="mt-6 px-0">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-lg font-medium  rounded-lg bg-red-500  text-white 
               hover:bg-red-700 hover:text-white transition duration-200"
        >
          <FaSignOutAlt className="mr-3 text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
};

const DropdownMenu = ({ title, icon, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown with memoized function to prevent unnecessary re-renders
  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <li className="w-full">
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700 rounded-lg 
                      hover:text-blue-600 hover:bg-gray-200 transition duration-200"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        {isOpen ? (
          <FaChevronUp className="text-gray-600" />
        ) : (
          <FaChevronDown className="text-gray-600" />
        )}
      </button>

      {/* AnimatePresence enables exit animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="pl-3 overflow-hidden"
          >
            {menuItems.map(({ to, label, Icon }, index) => (
              <li key={index}>
                <Link
                  to={to}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 
                                 rounded-lg transition duration-200"
                >
                  <Icon className="mr-3 text-lg" />
                  {label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default Sidebar;
