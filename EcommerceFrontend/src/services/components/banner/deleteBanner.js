import axiosInstance from "../../axiosInstance";

export async function deleteBanner(bannerData) {
  try {
    // Send the data in the body with the DELETE request
    const response = await axiosInstance.delete(
      "banner/deleteBanner",
      { data: bannerData } // Pass the data in the `data` object
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error during deleting Banner:",
      error.response?.data || error.message
    );
    throw error;
  }
}
