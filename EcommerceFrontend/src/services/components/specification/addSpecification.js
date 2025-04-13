import axiosInstance from "../../axiosInstance";

export async function addSpecification(specificationData) {
  try {
    const response = await axiosInstance.post(
      "/specification/createspecification",
      specificationData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error adding Specification:",
      error.response?.data || error.message
    );
    throw error;
  }
}
