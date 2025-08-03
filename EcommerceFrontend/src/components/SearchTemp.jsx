import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/components/products/getProduct";
import { FiSearch } from "react-icons/fi";
import notFoundImage from "../../public/notFoundImage/404.jpg";

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProduct(),
    staleTime: 5 * 60 * 1000,
  });

  const products = productsData?.response || [];

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter((p) =>
        p.productname.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchQuery, products]);

  const handleSelectProduct = (product) => {
    navigate(`/product-details/${product.productid}`);
    setSearchQuery("");
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative hidden md:block w-1/2 mx-4">
      <div className="relative bg-white rounded-md overflow-hidden flex items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setShowDropdown(true)}
          className="w-full px-4 py-2 outline-none text-black pr-10" // add padding for icon
          onKeyDown={(e) => e.key === "Enter" && handleSearch(e)} // enter key triggers search
        />
        <FiSearch size={18} className="absolute right-3 text-gray-500 " />
      </div>

      {showDropdown && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product.productid}
                onClick={() => handleSelectProduct(product)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {product.productname}
              </li>
            ))
          ) : (
            <div>
              <img
                src={notFoundImage}
                alt="No products found"
                className="w-16 h-16 mx-auto my-4"
              />
              <li className="px-4 py-2 text-gray-500 text-center">
                No products found
              </li>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
