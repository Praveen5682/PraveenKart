import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-black fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="flex items-center justify-between mx-auto py-4 px-10">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold text-white">
          Flowbite
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <HiX size={25} /> : <HiMenuAlt4 size={25} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-white hover:text-blue-500">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-blue-500">
            About
          </Link>
          <Link to="/services" className="text-white hover:text-blue-500">
            Services
          </Link>
          <Link to="/contact" className="text-white hover:text-blue-500">
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-black absolute top-14 left-0 w-full p-4">
          <Link
            to="/"
            className="block text-white py-2"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-white py-2"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/services"
            className="block text-white py-2"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="block text-white py-2"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
