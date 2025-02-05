import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";
import useRegisterCheck from "../hooks/useRegisterCheck";

const RegistrationRoute = ({ children }) => {
  const isRegistered = useRegisterCheck();
  const isLoggedIn = useAuthCheck();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
      return;
    }
  }, [isLoggedIn]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      navigate("/", { replace: true });
    }
  }, [isRegistered]);

  return children;
};

export default RegistrationRoute;
