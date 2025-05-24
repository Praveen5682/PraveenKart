import axiosInstance from "../../axiosInstance";

export async function postComment(commentData) {
  try {
    const response = await axiosInstance.post(
      "comment/postComment",
      commentData
    );

    return response.data;
  } catch (error) {
    console.error("Error during Adding Comment:", error);
    throw error;
  }
}
