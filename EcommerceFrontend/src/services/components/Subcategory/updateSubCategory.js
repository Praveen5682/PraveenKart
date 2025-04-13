import axiosInstance from "../../axiosInstance";

export async function updateSubCategory() {
  try {
    const response = await axiosInstance.put(
      "productSubcategory/updateSubcategory"
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error during updating SubCategory:",
      error.response?.data || error.message
    );
    throw error;
  }
}
