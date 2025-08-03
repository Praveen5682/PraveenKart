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
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct } from "../../../services/components/products/getProduct";
import { createWishlist } from "../../../services/components/wishlist/createWishlist";
import toast from "react-hot-toast";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const BestSellerSection = () => {
  const queryClient = useQueryClient();
  const useridFromLocalStorage = localStorage.getItem("userid");

  const { data } = useQuery({
    queryFn: () => getProduct(),
    queryKey: ["products"],
  });

  const products = data?.response || [];

  console.log("products", products);

  const addWishlistMutation = useMutation({
    mutationFn: createWishlist,
    onSuccess: (data) => {
      console.log("Wishlist created successfully:", data);
      queryClient.invalidateQueries(["wishlist"]);
      toast.success(data.message);
    },
    onError: (error) => {
      console.error("Error creating wishlist:", error);
      toast.error(error.response?.data?.message);
    },
  });

  const handleWishlist = (e, productid) => {
    e.stopPropagation();
    addWishlistMutation.mutate({
      productid,
      userid: Number(useridFromLocalStorage),
    });
  };

  return (
    <div className="container mx-auto px-6 mt-10">
      <div className="relative mb-10 flex items-center justify-center">
        {/* Centered Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          🛒 Products
        </h2>
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative"
            onClick={() => handleNavigateToProductDetails(product.productid)}
          >
            {/* Heart Icon for Wishlist */}
            <div
              className="absolute z-40 top-2 right-2 p-3 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-200"
              onClick={(e) => handleWishlist(e, product.productid)}
            >
              <FaRegHeart size={16} color="red" />
            </div>
            <div className="cursor-pointer overflow-hidden">
              <img
                src={`${IMG_URL}/uploads/${product?.defaultimage}`}
                crossOrigin="anonymous"
                alt={product.productname}
                className="w-[300px] h-[350px] object-cover mx-auto transform transition duration-500 hover:scale-110"
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
      {products.length > 8 && (
        <div className="flex items-center justify-center">
          {" "}
          <Link
            to="/products"
            className=" bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default BestSellerSection;
