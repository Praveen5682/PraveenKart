import axiosInstance from "../../axiosInstance";

export async function createWishlist(wishlistData) {
  try {
    const response = await axiosInstance.post(
      "/wishlist/createwishlist",
      wishlistData
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error Adding Wishlist:",
      error.response?.data || error.message
    );
    throw error;
  }
}
