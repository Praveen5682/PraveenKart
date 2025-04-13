import axiosInstance from "../../axiosInstance";

export async function getProduct(productData) {
  // console.log(productData)
  try {
    const response = await axiosInstance.get("api/getproduct", productData);
    return response.data;
  } catch (error) {
    console.error("Error during Fetching Product:", error);
    throw error;
  }
}
