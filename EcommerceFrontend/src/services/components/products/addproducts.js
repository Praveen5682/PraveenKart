import axiosInstance from "../../axiosInstance";

export async function addProduct(productData) {
  try {
    // Sending the formData using axios
    const response = await axiosInstance.post("api/addproduct", productData, {
      headers: {
        "Content-Type": "multipart/form-data", // Tell the server that this is a form-data request
      },
    });
    return response.data; // Return the server response
  } catch (error) {
    console.error("Error during Adding Product:", error);
    throw error; // Propagate the error
  }
}
