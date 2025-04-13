import axiosInstance from "../../axiosInstance";

export async function getProductCategory() {
  try {
    const response = await axiosInstance.get("productcategory/category");
    return response.data;
  } catch (error) {
    console.error(
      "Error during Fetching Product:",
      error.response?.data || error.message
    );
    throw error;
  }
}
