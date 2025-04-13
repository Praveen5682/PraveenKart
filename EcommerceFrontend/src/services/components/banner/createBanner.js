import axiosInstance from "../../axiosInstance";

export async function createBanner(bannerData) {
  try {
    const response = await axiosInstance.post(
      "/banner/createbanner",
      bannerData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error creating Banner:",
      error.response?.data || error.message
    );
    throw error;
  }
}
