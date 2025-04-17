import { jwtDecode } from "jwt-decode"; // ✅ Correct

const getUserDetailsFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("Token not found");
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default getUserDetailsFromToken;
