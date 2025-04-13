import axiosInstance from "../../axiosInstance";

export async function addSubCategory(SubCategoryData) {
  try {
    const response = await axiosInstance.post(
      "/productSubcategory/CreateSubCategory",
      SubCategoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error adding SubCategory:",
      error.response?.data || error.message
    );
    throw error;
  }
}
