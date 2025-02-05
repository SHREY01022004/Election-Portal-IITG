import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useCandidateCheck = () => {
  const [isCandidate, setIsCandidate] = useState(true);
  const userData = useSelector((store) => store.auth);

  const checkCandidate = async () => {
    if (userData) {
      if (userData?.candidates?.length !== 0) {
        setIsCandidate(true);
      } else {
        setIsCandidate(false);
      }
    }
  };

  useEffect(() => {
    checkCandidate();
  }, [userData]);

  return isCandidate;
};

export default useCandidateCheck;
