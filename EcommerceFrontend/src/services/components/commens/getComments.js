import axiosInstance from "../../axiosInstance";

export async function getComments(product_id) {
  try {
    const response = await axiosInstance.post(
      "comment/getComments",
      product_id
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error during Fetching comments Data:",
      error.response?.data || error.message
    );
    throw error;
  }
}
