import axiosInstance from "../../axiosInstance";

export async function getCart(userid) {
  try {
    const response = await axiosInstance.post("cart/getcarts", userid);
    return response.data;
  } catch (error) {
    console.error(
      "Error during Fetching Cart Data:",
      error.response?.data || error.message
    );
    throw error;
  }
}
