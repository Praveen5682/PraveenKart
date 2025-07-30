import React from "react";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWishlist } from "../../../services/components/wishlist/getWishlist";
import { addToCart } from "../../../services/components/cart/addToCart";
import toast from "react-hot-toast";
import { deleteWishlist } from "../../../services/components/wishlist/deleteWishlist";
import noWishlistImage from "../../../../public/notFoundImage/no-wish-list-items.jpg";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const Section1 = () => {
  const queryClient = useQueryClient();
  const useridFromLocalStorage = localStorage.getItem("userid");

  const { data, isLoading } = useQuery({
    queryKey: ["wishlistItems"],
    queryFn: () => getWishlist({ userid: Number(useridFromLocalStorage) }),
  });

  const wishlistItems = data?.data || [];

  // Add To Cart Mutation
  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (data, variables) => {
      // <-- add variables
      toast.success(data.message);

      // Delete item from wishlist after adding to cart
      deleteWishlistItemMutation.mutate({
        userid: variables.userid,
        productid: variables.productid,
      });

      // Refresh wishlist
      queryClient.invalidateQueries(["wishlistItems"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    },
  });

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    addToCartMutation.mutate({
      userid: Number(useridFromLocalStorage),
      price_at_add_time: Number(product.productprice), // ✅ correct price
      productid: product.productid,
      quantity: 1,
    });
  };

  const deleteWishlistItemMutation = useMutation({
    mutationFn: deleteWishlist,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.refetchQueries(["wishlistItems"], { exact: true });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const handleDeleteWishlistItem = (product) => {
    const confirmation = window.confirm(
      `Are you sure you want to remove ${product.productname} from your wishlist?`
    );
    if (!confirmation) return;
    deleteWishlistItemMutation.mutate({
      userid: Number(useridFromLocalStorage),
      productid: product.productid,
    });
  };

  return (
    <div className="container mx-auto px-6 py-12 mt-12">
      {/* Title Section */}
      <div className="flex flex-col items-center mb-8 relative">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2 text-center">
          <FiHeart className="text-red-500" /> Your Wishlist
        </h2>

        {/* Continue Shopping Button */}
        <Link
          to="/products"
          className="absolute right-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.productid}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition max-w-sm mx-auto h-full"
            >
              <div className="flex flex-col h-full">
                <img
                  src={IMG_URL + "/uploads/" + item.defaultimage}
                  crossOrigin="anonymous"
                  alt={item.productname}
                  className="w-full h-60 object-contain rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.productname}
                </h3>
                <p className="text-sm text-gray-600 mt-1 flex-grow">
                  {item.productdescription}
                </p>
                <p className="text-blue-600 font-bold text-lg mt-2">
                  ₹{item.productprice}
                </p>

                {/* Buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 text-sm rounded-md hover:bg-green-600 transition"
                  >
                    <FiShoppingCart /> Add to Cart
                  </button>
                  <button
                    onClick={() => handleDeleteWishlistItem(item)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 text-sm rounded-md hover:bg-red-600 transition"
                  >
                    <FiTrash2 size={18} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <img
            src={noWishlistImage}
            alt="Wishlist not found"
            className="h-60 mx-auto mb-4"
          />{" "}
          <h3 className="text-xl font-semibold text-gray-700">
            Your wishlist is empty
          </h3>
          <p className="text-gray-500 mt-2">
            Browse products and add them to your wishlist.
          </p>
          <Link
            to="/products"
            className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Section1;
