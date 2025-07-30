import React from "react";
import produt1 from "../../../assets/frontend_assets/p_img2_1.png";
import produt2 from "../../../assets/frontend_assets/p_img11.png";
import produt3 from "../../../assets/frontend_assets/p_img48.png";
import produt4 from "../../../assets/frontend_assets/p_img31.png";
import { useQuery } from "@tanstack/react-query";
import { getProductCategory } from "../../../services/components/category/getproductcategory";
import { Link } from "react-router-dom";

const IMG_URL = import.meta.env.VITE_IMG_URL;
const Section1 = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getProductCategory,
    queryKey: ["allcategories"],
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 5000,
  });

  const Allcategories = data?.data || [];
  console.log("👍🏻", Allcategories);

  return (
    <div className="py-12 mt-12">
      <div className="container mx-auto px-6">
        <div className="relative mb-10 flex items-center justify-center">
          {/* Centered Title */}
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            🛍️ Shop By Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {Allcategories.slice(0, 8).map((category) => (
            <div key={category.id} className="relative">
              <Link to={`/subcategory/${category.id}`}>
                <div className="cursor-pointer overflow-hidden">
                  <img
                    src={IMG_URL + "/uploads/" + category.productcategoryimage}
                    crossOrigin="anonymous"
                    alt={category.productcategoryname}
                    className="w-full h-64 object-cover transform transition duration-500 hover:scale-110"
                  />
                </div>
              </Link>
              <div>
                <p className="text-lg font-semibold text-center pt-5">
                  {category.productcategoryname}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section1;
