import React from "react";
import produt1 from "../../../assets/frontend_assets/p_img2_1.png";
import produt2 from "../../../assets/frontend_assets/p_img11.png";
import produt3 from "../../../assets/frontend_assets/p_img48.png";
import produt4 from "../../../assets/frontend_assets/p_img31.png";
import produt5 from "../../../assets/frontend_assets/p_img14.png";
import produt6 from "../../../assets/frontend_assets/p_img42.png";
import produt7 from "../../../assets/frontend_assets/p_img24.png";
import produt8 from "../../../assets/frontend_assets/p_img28.png";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const dummyProducts = [
  {
    id: 1,
    productname: "Product 1",
    image: produt1,
  },

  {
    id: 2,
    productname: "Product 2",
    image: produt2,
  },

  {
    id: 3,
    productname: "Product 3",
    image: produt3,
  },
  {
    id: 4,
    productname: "Product 4",
    image: produt4,
  },
];

const BestSellerSection = () => {
  return (
    <div className="container mx-auto px-6 mt-10">
      <p className="text-center pb-10 text-3xl">Best Seller</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            className="relative"
            onClick={() => handleNavigateToProductDetails(product.id)}
          >
            {/* Heart Icon for Wishlist */}
            <div className="absolute z-40 top-2 right-2 p-3 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-200">
              <FaRegHeart size={16} color="red" />
            </div>
            <div className="cursor-pointer overflow-hidden">
              <img
                src={product.image}
                alt={product.productname}
                className="w-full h-auto transform transition duration-500 hover:scale-110"
              />
            </div>
            <div>
              <p className="text-md font-normal text-center pt-5">
                {product.productname}
              </p>
              <p className="text-sm font-normal text-center pt-0">
                from Rs. {product.productprice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellerSection;
