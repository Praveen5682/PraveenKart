import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import SearchBar from "./SearchTemp";
import { getWishlist } from "../services/components/wishlist/getWishlist";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useQuery({
    queryKey: ["carts", userid],
    queryFn: () => getCart({ userid }),
    refetchOnMount: "always",
  });

  const cartData = data?.data;

  const { data: wishlistResponse } = useQuery({
    queryKey: ["wishlist", userid],
    queryFn: () => getWishlist({ userid }),
    refetchOnMount: "always",
  });

  const wishlistData = wishlistResponse?.data || [];

  useEffect(() => {
    const userDetails = getUserDetailsFromToken();
    if (userDetails) setUser(userDetails);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are already logged out");
    } else {
      localStorage.removeItem("token");
      navigate("/login");
      toast.success("Logged out successfully");
    }
  };

  return (
    <nav className="bg-black fixed w-full z-50 top-0 start-0 border-b border-gray-700">
      <div className="flex items-center justify-between mx-auto py-4 px-6 md:px-10">
        <Link
          to="/"
          className="text-3xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-600 tracking-wide hover:scale-105 transition-transform duration-300"
        >
          PraveenKart
        </Link>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />

        <div className="hidden md:flex items-center space-x-6 text-white relative">
          <Link
            to="/"
            className={`hover:text-blue-500 px-2 rounded-xl ${
              location.pathname === "/" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`hover:text-blue-500 px-2 rounded-xl ${
              location.pathname === "/products" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Products
          </Link>
          <Link
            to="/allcategories"
            className={`hover:text-blue-500 px-2 rounded-xl ${
              location.pathname === "/allcategories"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            Categories
          </Link>
          <Link to="/wishlist" className="relative hover:text-blue-500">
            <FiHeart size={22} />
            {wishlistData?.length > 0 && (
              <span className="absolute -top-3 -right-2 w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                {wishlistData.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative hover:text-blue-500">
            <FiShoppingCart size={22} />
            {cartData?.length > 0 && (
              <span className="absolute -top-3 -right-2 w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                {cartData.length}
              </span>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="hover:text-blue-500"
            >
              <FiUser size={22} />
            </button>

            {accountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg py-4 z-30">
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

                <div className="px-4 space-y-2">
                  {user?.roleId === 1 && (
                    <Link
                      to="/dashboard"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex items-center gap-2 text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2"
                    >
                      <FiHome /> Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2"
                  >
                    <FiLogIn /> Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2"
                  >
                    <FiUserPlus /> Register
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2"
                  >
                    <FiSettings /> Profile
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2"
                  >
                    <FiShoppingBag /> Orders
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2"
                  >
                    <FiHeart /> Wishlist
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setAccountDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-sm text-white hover:bg-blue-500 rounded-md px-4 py-2"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <HiX size={25} /> : <HiMenuAlt4 size={25} />}
        </button>
      </div>

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
