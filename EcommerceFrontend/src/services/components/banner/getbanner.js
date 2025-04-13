import axiosInstance from "../../axiosInstance";

export async function getBanner() {
  try {
    const response = await axiosInstance.get("banner/getbanner");
    return response.data;
  } catch (error) {
    console.error(
      "Error during Fetching Banners:",
      error.response?.data || error.message
    );
    throw error;
  }
}
