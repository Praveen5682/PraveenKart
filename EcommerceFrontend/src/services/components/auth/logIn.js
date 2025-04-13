import axiosInstance from "../../axiosInstance";

export async function createLogin(loginData) {
  try {
    const response = await axiosInstance.post("auth/login", loginData, {
      // withCredentials: true, // Ensure credentials (cookies) are included in the request
    });
    return response.data;
  } catch (error) {
    console.error("Error during Login:", error);
    throw error; // Optionally rethrow or handle the error differently
  }
}
