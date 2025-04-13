import axiosInstance from "../../axiosInstance";

export async function createRegistration(registrationData) {
  // console.log(productData)
  try {
    const response = await axiosInstance.post(
      "auth/register",
      registrationData
    );
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}
