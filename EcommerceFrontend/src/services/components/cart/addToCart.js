import axiosInstance from "../../axiosInstance";

export async function addToCart(cartData) {
  try {
    const response = await axiosInstance.post("cart/addToCart", cartData, {});
    return response.data;
  } catch (error) {
    console.error("Error during Adding to cart:", error);
    throw error;
  }
}
