import { Navigate } from "react-router-dom";
import { CheckLogin } from "./api/auth";
const PrivateRoute = ({ children }) => {
  const isAuth = CheckLogin();
  return isAuth ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
