import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import getUserDetailsFromToken from "./getUserDetailsFromToken";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

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
    <nav className="bg-black fixed w-full z-20 top-0 start-0 border-b border-gray-700">
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
              <div className="absolute right-0 mt-2 w-56 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg py-2 z-30">
                {/* User Profile Info */}
                <div className="flex items-center px-4 py-2 space-x-3">
                  <img
                    src={user?.dp} // User profile picture
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-semibold">
                      {user?.fullName}
                    </span>
                    <span className="text-white text-sm font-semibold">
                      {user?.email}
                    </span>
                  </div>
                </div>

                {/* Dropdown Links */}
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-500 rounded-md transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-500 rounded-md transition-all duration-300"
                >
                  Register
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-500 rounded-md transition-all duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-500 rounded-md transition-all duration-300 w-full text-left"
                >
                  Logout
                </button>
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
