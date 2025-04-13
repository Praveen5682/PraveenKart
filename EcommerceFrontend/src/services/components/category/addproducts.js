import axiosInstance from "../../axiosInstance";

export async function addCategory(productcategoryData) {
  try {
    const response = await axiosInstance.post(
      "/productcategory/category",
      productcategoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error adding category:",
      error.response?.data || error.message
    );
    throw error;
  }
}
