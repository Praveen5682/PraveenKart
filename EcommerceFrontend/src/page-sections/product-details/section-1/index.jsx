import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct } from "../../../services/components/products/getProduct";
import { addToCart } from "../../../services/components/cart/addToCart";
import toast from "react-hot-toast";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const ProductImageGallery = ({ previews = [], imagePath, productName }) => {
  const [index, setIndex] = useState(0);

  const mainImage =
    previews[index]?.previewUrl ||
    `${IMG_URL}/uploads/${imagePath?.replace(/\\/g, "/")}`;

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % previews.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + previews.length) % previews.length);
  };

  return (
    <div className="mt-20 lg:mr-6">
      <div className="relative w-full text-center mb-6">
        <img
          src={mainImage}
          crossOrigin="anonymous"
          alt={productName}
          className="w-[350px] h-[400px] object-cover mx-auto rounded-xl transition duration-500"
        />

        {/* Prev/Next buttons */}
        {previews.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-100"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-100"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Preview thumbnails */}
      <div className="flex gap-4 justify-center">
        {previews.slice(0, 3).map((img, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`cursor-pointer border-2 rounded-xl p-1 transition hover:scale-105 ${
              i === index ? "border-blue-600" : "border-gray-300"
            }`}
          >
            <img
              src={img.previewUrl}
              alt={`preview-${i}`}
              className="w-[90px] h-[90px] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductTabs = ({
  specifications = [],
  description = "",
  comments = [],
}) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-16">
      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("description")}
          className={`pb-2 text-lg font-medium ${
            activeTab === "description"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("specs")}
          className={`pb-2 text-lg font-medium ${
            activeTab === "specs"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Specifications
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`pb-2 text-lg font-medium ${
            activeTab === "comments"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Comments
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "description" && (
          <p className="text-gray-700 text-base leading-relaxed">
            {description}
          </p>
        )}

        {activeTab === "specs" && (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {specifications.map((spec, index) => (
              <li key={index}>
                <strong>{spec.label}: </strong>
                {spec.value}
              </li>
            ))}
          </ul>
        )}

        {activeTab === "comments" && (
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments available.</p>
            ) : (
              comments.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 border border-gray-200 p-4 rounded-lg shadow-sm"
                >
                  {/* Profile picture */}
                  <img
                    src={c.profile || "https://via.placeholder.com/40"}
                    alt={c.user}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  {/* Comment content */}
                  <div>
                    <p className="font-semibold text-zinc-800">{c.user}</p>
                    <p className="text-gray-600 text-sm mt-1">{c.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const QuantityInput = ({ value, onChange }) => {
  const updateQty = (qty) => {
    onChange(Math.max(1, qty));
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <button
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => updateQty(value - 1)}
      >
        -
      </button>
      <input
        type="number"
        min="1"
        className="w-16 text-center bg-gray-100 border border-gray-300 rounded"
        value={value}
        onChange={(e) => updateQty(Number(e.target.value))}
      />
      <button
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => updateQty(value + 1)}
      >
        +
      </button>
    </div>
  );
};

const Section1 = () => {
  const { productid } = useParams();
  const userid = localStorage.getItem("userid");
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    qty: 1,
  });

  const { data: productsData } = useQuery({
    queryFn: () => getProduct({ productid }),
    queryKey: ["product", productid],
  });

  const product = productsData?.response?.[0];

  const addToCartMutation = useMutation({
    mutationFn: addToCart, // Your function for adding items to the cart
    onSuccess: () => {
      // Show success toast
      toast.success("Added to cart successfully");

      // Invalidate the 'carts' query to refetch updated data
      queryClient.invalidateQueries(["carts", userid]);
    },
    onError: (err) => {
      // Show error toast
      toast.error(err.message);
    },
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddCart = () => {
    if (!product) return;

    const payload = {
      userid,
      productid,
      quantity: formData.qty,
      price_at_add_time: product.productprice,
    };

    addToCartMutation.mutate(payload);
  };

  if (!product) return null;

  return (
    <section className="py-20 bg-white text-zinc-900">
      <div className="container mx-auto px-6 lg:px-32">
        <div className="grid lg:grid-cols-2 gap-14">
          <ProductImageGallery
            previews={product.previews || []}
            imagePath={product?.productimages?.[0]?.defaultimage}
            productName={product?.productname}
          />

          <div className="mt-10 lg:mt-20 space-y-6">
            <h1 className="text-4xl font-semibold text-black">
              {product.productname}
            </h1>

            <p className="text-base text-gray-700 leading-relaxed">
              {product?.productdescription}
            </p>

            <h3 className="text-3xl text-blue-600 font-bold">
              Rs. {product.productprice}
            </h3>

            <div>
              <h5 className="text-lg font-medium mb-2">Quantity</h5>
              <QuantityInput
                value={formData.qty}
                onChange={(val) => handleChange("qty", val)}
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
              <button
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
                onClick={handleAddCart}
              >
                Add to Cart
              </button>

              <button
                className="flex items-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
                // onClick={handleAddWishlist} // define this function
              >
                <FontAwesomeIcon icon={faHeart} />
                <span>Add to Wishlist</span>
              </button>
            </div>
          </div>
        </div>

        <ProductTabs
          description={product?.productdescription}
          specifications={product?.specifications || []}
          comments={product?.comments || []}
        />
      </div>
    </section>
  );
};

export default Section1;
