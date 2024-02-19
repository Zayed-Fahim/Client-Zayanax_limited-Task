import Cookies from "js-cookie";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CommonContext from "../contexts/CommonContext";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { setStatus, setText, setIsSuccess } = useContext(CommonContext);
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  if (role === "admin" && token) {
    return children;
  } else if (role !== "admin") {
    setTimeout(() => {
      setText("You are not Authorized");
      setStatus("Attempt Failed");
      setIsSuccess(true);
    });

    return setTimeout(() => {
      setIsSuccess(false);
      navigate("/");
    }, 2000);
  }
};
export default PrivateRoute;
