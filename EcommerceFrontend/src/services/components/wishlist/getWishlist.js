import axiosInstance from "../../axiosInstance";

export async function getWishlist({ userid }) {
  try {
    const response = await axiosInstance.post("/wishlist/getwishlist", {
      userid,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error Fetching Wishlist:",
      error.response?.data || error.message
    );
    throw error;
  }
}
