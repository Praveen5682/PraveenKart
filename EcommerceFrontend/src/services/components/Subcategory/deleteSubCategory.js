import axiosInstance from "../../axiosInstance";

export async function deleteSubCategory(SubCategoryData) {
  try {
    // Send the data in the body with the DELETE request
    const response = await axiosInstance.delete(
      "productSubcategory/deleteSubcategory",
      { data: SubCategoryData } // Pass the data in the `data` object
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error during deleting Product SubCategory:",
      error.response?.data || error.message
    );
    throw error;
  }
}
