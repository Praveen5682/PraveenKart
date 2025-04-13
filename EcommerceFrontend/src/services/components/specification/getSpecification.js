import axiosInstance from "../../axiosInstance";

export async function getSpecification() {
  try {
    const response = await axiosInstance.post("specification/getspecification");
    return response?.data;
  } catch (error) {
    console.error(
      "Error during Fetching specification:",
      error.response?.data || error.message
    );
    throw error;
  }
}
