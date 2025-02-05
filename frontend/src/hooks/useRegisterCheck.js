import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useRegisterCheck = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const userData = useSelector((store) => store.auth);

  const checkRegistration = async () => {
    if (userData) {
      if (
        userData.euser.registration_complete !== undefined &&
        userData.euser.registration_complete
      ) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    }
  };

  useEffect(() => {
    checkRegistration();
  }, [userData]);

  return isRegistered;
};

export default useRegisterCheck;
