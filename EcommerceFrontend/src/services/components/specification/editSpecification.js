import axiosInstance from "../../axiosInstance";

export async function editSpecification({
  specificationid,
  specificationName,
}) {
  try {
    const response = await axiosInstance.post(
      "specification/editspecification",
      {
        specificationid,
        specificationName,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error during editing Specification:",
      error.response?.data || error.message
    );
    throw error;
  }
}
