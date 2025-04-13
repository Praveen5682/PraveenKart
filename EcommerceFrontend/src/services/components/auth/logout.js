import axiosInstance from "../../axiosInstance";

export async function userLogout(logoutData = {}) {
  try {
    const response = await axiosInstance.get("auth/userlogout", logoutData, {
      withCredentials: true, // Ensure credentials (cookies) are included in the request
    });
    return response.data;
  } catch (error) {
    console.error("Error during Logout:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during logout."
    );
  }
}
