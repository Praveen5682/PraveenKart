import axiosInstance from "../../axiosInstance";

export async function deleteProductCategory(productcategoryData) {
  try {
    // Send the data in the body with the DELETE request
    const response = await axiosInstance.delete(
      "productcategory/category",
      { data: productcategoryData } // Pass the data in the `data` object
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error during deleting Product Category:",
      error.response?.data || error.message
    );
    throw error;
  }
}
