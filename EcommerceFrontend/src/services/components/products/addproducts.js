import axiosInstance from "../../axiosInstance";

export async function addProduct(productData) {
  try {
    // Sending the formData using axios
    const response = await axiosInstance.post(
      "product/createproduct",
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      } // No need to set Content-Type manually
    );
    return response.data; // Return the server response
  } catch (error) {
    console.error("Error during Adding Product:", error);
    throw error; // Propagate the error
  }
}
