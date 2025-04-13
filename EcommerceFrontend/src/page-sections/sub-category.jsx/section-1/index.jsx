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
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSubCategory } from "../../../services/components/Subcategory/getSubCategory";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const Section1 = () => {
  const { categoryid } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSubCategory(categoryid),
    queryKey: ["subcategory", categoryid],
  });

  const subcategoriesData = data?.data?.filter(
    (subCat) => subCat.parent_category_id === Number(categoryid)
  );

  console.log("Filtered subcategories:", subcategoriesData);

  const navigate = useNavigate();

  const handleNavigateToProductDetails = (productid) => {
    navigate(`/product-details/${productid}`);
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <p className="text-center pb-10 text-3xl">Sub Category</p>

        {isLoading ? (
          <p className="text-center text-lg font-semibold">Loading...</p>
        ) : isError ? (
          <p className="text-center text-lg font-semibold text-red-500">
            Failed to load data. Please try again.
          </p>
        ) : subcategoriesData?.length === 0 ? (
          <p className="text-center text-lg font-semibold text-gray-500">
            No subcategories found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {subcategoriesData?.map((subCat) => (
              <div
                key={subCat.id}
                className="relative"
                onClick={() => handleNavigateToProductDetails(subCat.id)}
              >
                {/* Heart Icon for Wishlist */}
                <div className="absolute z-10 top-2 right-2 p-3 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-200">
                  <FaRegHeart size={16} color="red" />
                </div>
                <div className="cursor-pointer overflow-hidden">
                  <img
                    src={IMG_URL + "/uploads/" + subCat.subcategoryimage}
                    alt={subCat.subcategoryname}
                    crossOrigin="anonymous"
                    className="w-[300px] h-[350px] object-cover mx-auto transform transition duration-500 hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-md font-normal text-center pt-5">
                    {subCat.subcategoryname}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Section1;
