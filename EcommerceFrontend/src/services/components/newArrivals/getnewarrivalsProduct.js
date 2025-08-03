// getProduct.js
import axiosInstance from "../../axiosInstance";

export async function getnewarrivalsProduct(productData) {
  try {
    const response = await axiosInstance.post(
      "newarrivals/getnewarrivalsproduct",
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error during Fetching new arrivals:", error);
    throw error;
  }
}
