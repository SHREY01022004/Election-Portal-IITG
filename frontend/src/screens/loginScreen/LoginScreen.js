import React from "react";
import outlooklogo from "./microsoft.png";
import axios from "axios";
import MicrosoftLogin from "react-microsoft-login";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { getUser } from "../../actions/auth";
import { useNavigate, Link } from "react-router-dom";
import { ELECTIONAPI, IS_PROD, OUTLOOK_LOGIN_URL } from "../../constants";
import bg from "../../assets/authBg.jpg";
import LogoSVG from "../../assets/svgs/logo.svg";

const LoginScreen = () => {
  var screenWidth = window.innerHeight;
  screenWidth = 0.8 * screenWidth;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const responseGoogle = async (data) => {
    const accessToken = data["accessToken"];
    if (accessToken) {
      try {
        const res = await axios.post(
          `${ELECTIONAPI}/auth/social/google/`,
          {
            access_token: accessToken,
          },
          {
            withCredentials: true,
          }
        );
        dispatch(getUser());
        if (!res?.data?.user?.registration_complete) {
          navigate("/register", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } catch (err) {
        alert("Something went wrong!Please check your connection");
        return;
      }
    }
  };

  const authHandler = async (err, data) => {
    if (!IS_PROD) {
      if (err) {
        console.log(err);
        alert("Something went wrong on top!Please check your connection");
        return;
      }
      const accessToken = data["accessToken"];
      try {
        const res = await axios.post(
          `${ELECTIONAPI}/auth/social/outlook/`,
          {
            access_token: accessToken,
          },
          {
            withCredentials: true,
          }
        );
        dispatch(getUser());
        sessionStorage.removeItem("msal.idtoken");
        if (!res?.data?.user?.registration_complete) {
          navigate("/register", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } catch (err) {
        alert("Something went wrong!Please check your connection");
        return;
      }
    }
  };
  return (
    <>
      <div
        className="block md:hidden min-w-scree h-screen"
        style={{
          background: "linear-gradient(rgba(255,255,255,1) 50%, #9ec39b 100%)",
        }}
      >
        <div className="flex flex-row space-x-4 items-center justify-center mt-4">
          <div className="h-12 w-12 md:h-20 md:w-20">
            <Link to="/">
              <img src={LogoSVG} alt="logo" />
            </Link>
          </div>
          <div>
            <p className="text-lg font-medium" style={{ color: "#4b5563" }}>
              Gymkhana Elections 2024, IITG
            </p>
          </div>
        </div>
        <div className="mt-10 p-4 px-6 text-center">
          <p className="font-medium" style={{ color: "#4b5563" }}>
            Register yourself by using IITG webmail.
          </p>
        </div>
        {IS_PROD ? (
          <div className="flex justify-center w-full">
            <div className="text-center w-[220px]">
              <a href={OUTLOOK_LOGIN_URL}>
                <div className="p-1 border-black border flex items-center">
                  <img src={outlooklogo} alt="" className="w-10 h-10 mr-3" />
                  <span className="font-medium">Sign in with Outlook</span>
                </div>
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-8 flex justify-center">
            <MicrosoftLogin
              clientId={"85ad6626-12c9-4c0d-a730-c07f81cd09c9"}
              redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
              tenantUrl={
                "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c"
              }
              authCallback={authHandler}
            />
          </div>
        )}
        {/* <div className="w-full text-center">
          <GoogleLogin
            clientId="774598959771-jilp7jr6a3677htqaf1na9adqoj3aolo.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <div className="flex border-2 border-blue-500  items-center bg-blue-500 mt-4 w-[220px]">
                  <div className="bg-white p-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt=""
                      className="w-8 h-8"
                    />
                  </div>
                  <div className="font-bold bg-blue-500 text-white p-2">
                    Sign in with Google
                  </div>
                </div>
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
          />
        </div> */}
        <div className="mt-20">
          <img className="" src={bg} alt="" />
        </div>
      </div>
      <div
        className="min-h-screen min-w-screen hidden md:block"
        style={{ backgroundColor: "#f8fafe" }}
      >
        <div className="flex justify-between">
          <div className="flex justify-center">
            <div>
              <div className="flex flex-row space-x-4 items-center md:ml-24 mt-8 md:mt-16">
                <div className="">
                  <Link to="/">
                    <img className="h-16 w-16" src={LogoSVG} alt="logo" />
                  </Link>
                </div>
                <div>
                  <p
                    class="text-lg font-medium sm:text-2xl"
                    style={{ color: "#4b5563" }}
                  >
                    Gymkhana Elections 2024, IIT Guwahati
                  </p>
                </div>
              </div>
              <div className="mt-8 md:mt-16 md:ml-24">
                <p
                  className="text-4xl font-medium mb-2"
                  style={{ color: "#2e2f2f" }}
                >
                  Sign In
                </p>
                <p className="text-lg font-normal" style={{ color: "#4b5563" }}>
                  Register yourself by using IITG email
                </p>
              </div>
              {IS_PROD ? (
                <div className="md:ml-24 mt-4">
                  <div className="w-[220px]">
                    <a href={OUTLOOK_LOGIN_URL}>
                      <div className="p-1 border-black border flex items-center">
                        <img
                          src={outlooklogo}
                          alt=""
                          className="w-10 h-10 mr-3"
                        />
                        <span className="font-medium">
                          Sign in with Outlook
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="md:ml-32 mt-8 ">
                  <MicrosoftLogin
                    clientId={"24fc6265-3b9b-4b94-813b-9b810b90c1e9"}
                    redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
                    tenantUrl={
                      "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c"
                    }
                    authCallback={authHandler}
                  />
                </div>
              )}
              {/* <div>
                <div className="">
                  <GoogleLogin
                    clientId="774598959771-jilp7jr6a3677htqaf1na9adqoj3aolo.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <div className="flex border-2 bg-blue-500 border-blue-500  items-cente ml-24 mt-4 w-[220px]">
                          <div className="bg-white p-2">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                              alt=""
                              className="w-8 h-8"
                            />
                          </div>
                          <div className="font-bold bg-blue-500 text-white p-2">
                            Sign in with Google
                          </div>
                        </div>
                      </button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className="hidden md:block">
            <img src={bg} alt="cards" className="h-screen" />
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginScreen;
