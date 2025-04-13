import axiosInstance from "../../axiosInstance";

export async function deleteSpecification(specificationid) {
  try {
    // Send the data in the body with the DELETE request
    const response = await axiosInstance.post(
      "specification/deletespecification",
      {
        specificationid,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error during deleting Specification:",
      error.response?.data || error.message
    );
    throw error;
  }
}
