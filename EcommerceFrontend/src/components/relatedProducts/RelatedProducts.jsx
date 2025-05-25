import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getRelatedProducts } from "../../services/components/products/getRelatedProducts";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const RelatedProducts = () => {
  const { productid, categoryid } = useParams();
  console.log("productid, productCategoryid", productid, categoryid);

  const { data, isLoading } = useQuery({
    queryKey: ["relatedProducts"],
    queryFn: () =>
      getRelatedProducts({
        category_id: categoryid,
        exclude_product_id: Number(productid),
      }),
  });

  const relatedProducts = data?.data || [];
  console.log("related", relatedProducts);

  const navigate = useNavigate();

  const handleNavigateToProductDetails = (productid) => {
    navigate(`/product-details/${productid}/${categoryid}`);
  };

  return (
    <div className="pb-0">
      <div className="container mx-auto px-6">
        <p className="text-center pb-10 text-3xl">Related Products</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product.productid}
              className="relative"
              onClick={() => handleNavigateToProductDetails(product.productid)}
            >
              {/* Heart Icon for Wishlist */}
              <div className="absolute z-40 top-2 right-2 p-3 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-200">
                <FaRegHeart size={16} color="red" />
              </div>
              <div className="cursor-pointer overflow-hidden">
                <img
                  src={
                    product.defaultimage
                      ? `${IMG_URL}/uploads/${product.defaultimage}`
                      : "/placeholder.png"
                  }
                  crossOrigin="anonymous"
                  alt={product.productname || "Product Image"}
                  className="w-full h-[360px] object-cover transform transition duration-500 hover:scale-110"
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
    </div>
  );
};

export default RelatedProducts;
