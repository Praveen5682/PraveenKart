import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import {
  FiShoppingCart,
  FiUser,
  FiLogIn,
  FiUserPlus,
  FiSettings,
  FiLogOut,
  FiShoppingBag,
  FiHeart,
  FiHome,
} from "react-icons/fi";
import toast from "react-hot-toast";
import getUserDetailsFromToken from "./getUserDetailsFromToken";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/components/cart/getCart";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const userid = localStorage.getItem("userid");
  const roleid = localStorage.getItem("roleid");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["carts", userid],
    queryFn: () => getCart({ userid }),
    refetchOnMount: "always",
  });

  const cartData = data?.data;
  // Mock user data (replace this with actual data from context or props)
  useEffect(() => {
    const userDetails = getUserDetailsFromToken(); // Get user details from token
    if (userDetails) {
      setUser(userDetails); // Set user details in the state
    }
    console.log(userDetails);
  }, []);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // If the token doesn't exist, the user is already logged out
      alert("You are already logged out");
    } else {
      // If the token exists, proceed with logout
      localStorage.removeItem("token");
      navigate("/login");
      toast.success("Logged out successfully");
    }
  };

  return (
    <nav className="bg-black fixed w-full z-50 top-0 start-0 border-b border-gray-700 ">
      <div className="flex items-center justify-between mx-auto py-4 px-6 md:px-10">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          praveenKart
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex w-1/2 mx-4 bg-white rounded-md overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 outline-none text-black"
          />
          <button type="submit" className="bg-blue-600 text-white px-4">
            Search
          </button>
        </form>

        {/* Icons + Links */}
        <div className="hidden md:flex items-center space-x-6 text-white relative">
          <Link to="/products" className="hover:text-blue-500">
            Products
          </Link>
          <Link to="/categories" className="hover:text-blue-500">
            Categories
          </Link>
          <Link to="/cart" className="relative hover:text-blue-500">
            <FiShoppingCart size={22} />
            {/* Badge */}
            {cartData?.length <= 0 ? (
              ""
            ) : (
              <span className="absolute -top-3 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {cartData?.length}
              </span>
            )}
          </Link>

          {/* Account with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="hover:text-blue-500"
            >
              <FiUser size={22} />
            </button>

            {/* Dropdown */}
            {accountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg py-4 z-30">
                {/* User Profile Info - Centered */}
                <div className="flex flex-col items-center px-4 mb-4 border-b border-blue-400 pb-3">
                  <img
                    src={user?.dp}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-white mb-2 shadow-md"
                  />
                  <span className="text-white text-base font-semibold">
                    {user?.fullName}
                  </span>
                  <span className="text-white text-sm opacity-90">
                    {user?.email}
                  </span>
                </div>

                {/* Dropdown Links with Icons */}
                <div className="px-4 space-y-2">
                  {user.roleId === 1 && (
                    <Link
                      to="/dashboard"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex items-center gap-2 text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2 transition-all duration-300"
                    >
                      <FiHome /> Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/login"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2 text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2 transition-all duration-300"
                  >
                    <FiLogIn /> Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2 text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2 transition-all duration-300"
                  >
                    <FiUserPlus /> Register
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2 text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2 transition-all duration-300"
                  >
                    <FiSettings /> Profile
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2 text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2 transition-all duration-300"
                  >
                    <FiShoppingBag /> Orders
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2 text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2 transition-all duration-300"
                  >
                    <FiHeart /> Wishlist / Saved Items
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setAccountDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2 transition-all duration-300"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <HiX size={25} /> : <HiMenuAlt4 size={25} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black absolute top-16 left-0 w-full p-4 space-y-2">
          <form onSubmit={handleSearch} className="flex w-full mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2 rounded-l-md text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 rounded-r-md"
            >
              Search
            </button>
          </form>
          <Link
            to="/"
            className="block text-white"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block text-white"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/categories"
            className="block text-white"
            onClick={() => setMenuOpen(false)}
          >
            Categories
          </Link>
          <Link
            to="/cart"
            className="block text-white"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>
          <Link
            to="/account"
            className="block text-white"
            onClick={() => setMenuOpen(false)}
          >
            Account
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
