import axiosInstance from "../../axiosInstance";

export async function getComments(productid) {
  try {
    const response = await axiosInstance.post("comment/getComments", productid);
    return response.data;
  } catch (error) {
    console.error(
      "Error during Fetching comments Data:",
      error.response?.data || error.message
    );
    throw error;
  }
}
