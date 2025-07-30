import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../services/components/products/getProduct";
import toast from "react-hot-toast";
import { createWishlist } from "../services/components/wishlist/createWishlist";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const Products = () => {
  const { categoryid, subcategoryid } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const useridFromLocalStorage = localStorage.getItem("userid");

  const { data } = useQuery({
    queryFn: () =>
      getProduct({
        productsubcategoryid: subcategoryid,
        userid: Number(useridFromLocalStorage),
      }),
    queryKey: ["products", subcategoryid],
  });

  const productsData = data?.response || [];

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

  const handleNavigateToProductDetails = (productid) => {
    navigate(`/product-details/${productid}/${categoryid}`);
  };

  return (
    <div className="py-20 mt-6">
      <div className="container mx-auto px-6">
        <div className="relative mb-10 flex items-center justify-center">
          {/* Centered Title */}
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            🛒 Products
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {productsData.map((prod) => (
            <div
              key={prod.productid}
              className="relative"
              onClick={() => handleNavigateToProductDetails(prod.productid)}
            >
              {/* Heart Icon for Wishlist */}
              <div
                className="absolute z-10 top-2 right-2 p-3 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-200"
                onClick={(e) => handleWishlist(e, prod.productid)}
              >
                <FaRegHeart size={16} color="red" />
              </div>

              <div className="cursor-pointer overflow-hidden">
                <img
                  src={`${IMG_URL}/uploads/${prod?.productimages[0].defaultimage}`}
                  crossOrigin="anonymous"
                  alt={prod.productname}
                  className="w-[300px] h-[350px] object-cover mx-auto transform transition duration-500 hover:scale-110"
                />
              </div>
              <div>
                <p className="text-md font-normal text-center pt-5">
                  {prod.productname}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
