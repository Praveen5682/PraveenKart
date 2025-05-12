import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../services/components/products/getProduct";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const Products = () => {
  const { subcategoryid } = useParams();
  console.log("subcategoryid", subcategoryid);

  const { data } = useQuery({
    queryFn: () => getProduct({ productsubcategoryid: subcategoryid }),
    queryKey: ["products"],
  });

  const productsData = data?.response || [];
  console.log("data", productsData);
  const navigate = useNavigate();

  const handleNavigateToProductDetails = (productid) => {
    navigate(`/product-details/${productid}`);
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <p className="text-center pb-10 text-3xl">Products</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {productsData.map((prod) => (
            <div
              key={prod.productid}
              className="relative"
              onClick={() => handleNavigateToProductDetails(prod.productid)}
            >
              {/* Heart Icon for Wishlist */}
              <div className="absolute z-10 top-2 right-2 p-3 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-200">
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
