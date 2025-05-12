import axiosInstance from "../../axiosInstance";

export async function deleteCart(cartData) {
  try {
    const response = await axiosInstance.post("cart/deletecarts", cartData);
    return response.data;
  } catch (error) {
    console.error("Error during Deleing cart:", error);
    throw error;
  }
}
