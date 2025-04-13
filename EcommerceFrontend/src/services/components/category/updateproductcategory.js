import axiosInstance from "../../axiosInstance";

export async function updateProductCategory() {
  try {
    const response = await axiosInstance.put("productcategory/category");
    return response.data;
  } catch (error) {
    console.error(
      "Error during updating Product category:",
      error.response?.data || error.message
    );
    throw error;
  }
}
