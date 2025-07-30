import axiosInstance from "../../axiosInstance";

export async function deleteWishlist(wishlistData) {
  try {
    const response = await axiosInstance.post(
      "/wishlist/deletewishlist",
      wishlistData
    );
    // Directly send { userid, productid }
    return response.data;
  } catch (error) {
    console.error(
      "Error Deleting Wishlist Item:",
      error.response?.data || error.message
    );
    throw error;
  }
}
