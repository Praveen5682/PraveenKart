import axiosInstance from "../../axiosInstance";

export async function getSubCategory() {
  try {
    const response = await axiosInstance.get(
      "productSubcategory/getSubcategory"
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error during Fetching SubCategory:",
      error.response?.data || error.message
    );
    throw error;
  }
}
