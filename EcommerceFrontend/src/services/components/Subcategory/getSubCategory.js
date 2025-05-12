import axiosInstance from "../../axiosInstance";

export async function getSubCategory({ parent_category_id }) {
  try {
    const response = await axiosInstance.post(
      "productSubcategory/getSubcategory",
      { parent_category_id }
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
