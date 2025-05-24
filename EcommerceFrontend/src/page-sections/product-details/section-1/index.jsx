import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct } from "../../../services/components/products/getProduct";
import { addToCart } from "../../../services/components/cart/addToCart";
import toast from "react-hot-toast";
import CommentsSection from "../../../components/comments/CommentsSection";

const IMG_URL = import.meta.env.VITE_IMG_URL;

// Helper Components
const ProductImageGallery = ({ previews = [], imagePath, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mainImage =
    previews[currentIndex]?.previewUrl ||
    `${IMG_URL}/uploads/${imagePath?.replace(/\\/g, "/")}`;

  const navigateImage = (direction) => {
    setCurrentIndex(
      (prev) => (prev + direction + previews.length) % previews.length
    );
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

        {previews.length > 1 && (
          <>
            <button
              onClick={() => navigateImage(-1)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-100"
            >
              ‹
            </button>
            <button
              onClick={() => navigateImage(1)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-100"
            >
              ›
            </button>
          </>
        )}
      </div>

      <div className="flex gap-4 justify-center">
        {previews.slice(0, 3).map((img, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`cursor-pointer border-2 rounded-xl p-1 transition hover:scale-105 ${
              i === currentIndex ? "border-blue-600" : "border-gray-300"
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
  productData,
}) => {
  const [activeTab, setActiveTab] = useState("description");
  const [commentsList, setCommentsList] = useState(comments);

  const handleAddComment = (newComment) => {
    // In a real app, you would send this to your backend
    setCommentsList((prev) => [
      ...prev,
      {
        ...newComment,
        profile: "https://via.placeholder.com/40",
        date: new Date().toISOString(),
      },
    ]);
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specs", label: "Specifications" },
    { id: "comments", label: "Comments" },
  ];

  return (
    <div className="mt-16">
      <div className="flex gap-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 text-lg font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

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
          <CommentsSection
            comments={commentsList}
            onAddComment={handleAddComment}
            productData={productData}
          />
        )}
      </div>
    </div>
  );
};

const QuantityInput = ({ value, onChange }) => {
  const updateQuantity = (newValue) => {
    onChange(Math.max(1, newValue));
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <button
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => updateQuantity(value - 1)}
      >
        -
      </button>
      <input
        type="number"
        min="1"
        className="w-16 text-center bg-gray-100 border border-gray-300 rounded"
        value={value}
        onChange={(e) => updateQuantity(Number(e.target.value))}
      />
      <button
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => updateQuantity(value + 1)}
      >
        +
      </button>
    </div>
  );
};

const ActionButtons = ({ onAddToCart, onBuyNow, onAddToWishlist }) => (
  <div className="flex flex-wrap gap-4 items-center">
    <button
      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
      onClick={onBuyNow}
    >
      Buy Now
    </button>
    <button
      className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
      onClick={onAddToCart}
    >
      Add to Cart
    </button>
    <button
      className="flex items-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
      onClick={onAddToWishlist}
    >
      <FontAwesomeIcon icon={faHeart} />
      <span>Add to Wishlist</span>
    </button>
  </div>
);

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-10 lg:mt-20 space-y-6">
      <h1 className="text-4xl font-semibold text-black">
        {product.productname}
      </h1>
      <p className="text-base text-gray-700 leading-relaxed">
        {product.productdescription}
      </p>
      <h3 className="text-3xl text-blue-600 font-bold">
        Rs. {product.productprice}
      </h3>
      <div>
        <h5 className="text-lg font-medium mb-2">Quantity</h5>
        <QuantityInput value={quantity} onChange={setQuantity} />
      </div>
    </div>
  );
};

const Section1 = () => {
  const { productid } = useParams();
  const userid = localStorage.getItem("userid");
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);

  const { data: productsData } = useQuery({
    queryFn: () => getProduct({ productid }),
    queryKey: ["product", productid],
  });

  const product = productsData?.response?.[0];
  const specifications =
    product?.specificationNames?.split(",").map((label, i) => ({
      label: label.trim(),
      value: product?.specificationDescriptions?.split("|")[i]?.trim() || "",
    })) || [];

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Added to cart successfully");
      queryClient.invalidateQueries(["carts", userid]);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  const handleAddToCart = () => {
    if (!product) return;

    addToCartMutation.mutate({
      userid,
      productid,
      quantity,
      price_at_add_time: product.productprice,
    });
  };

  if (!product) return null;

  return (
    <section className="py-20 bg-white text-zinc-900">
      <div className="container mx-auto px-6 lg:px-32">
        <div className="grid lg:grid-cols-2 gap-14">
          <ProductImageGallery
            previews={product.previews || []}
            imagePath={product?.productimages?.[0]?.defaultimage}
            productName={product.productname}
          />

          <div>
            <ProductDetails product={product} />
            <ActionButtons
              onAddToCart={handleAddToCart}
              onBuyNow={() => {}} // Implement buy now functionality
              onAddToWishlist={() => {}} // Implement wishlist functionality
            />
          </div>
        </div>

        <ProductTabs
          description={product.productdescription}
          specifications={specifications}
          comments={product?.comments || []}
          productData={product}
        />
      </div>
    </section>
  );
};

export default Section1;
