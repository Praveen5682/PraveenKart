import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Assuming you have an AuthContext

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth(); // Assuming you use the AuthContext to get user info
  const location = useLocation();

  if (!user || user.roleid !== 1) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return element;
};

export default PrivateRoute;
