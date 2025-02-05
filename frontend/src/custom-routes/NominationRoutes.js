import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";
import useCandidateCheck from "../hooks/useCandidateCheck";

const NominationRoute = ({ children }) => {
  const isCandidate = useCandidateCheck();
  const isLoggedIn = useAuthCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCandidate) {
      navigate("/", { replace: true });
    }
  }, [isCandidate]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
      return;
    }
  }, [isLoggedIn]);
  return children;
};

export default NominationRoute;
