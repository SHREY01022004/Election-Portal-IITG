import RouteNavbar from "../../Navbars/RouteNavbar";
import styles from "./ProfileNavBar.module.css";
import Eye from "./eye.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function capitalizeFirstLetter(string) {
  if (!string) return null;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const ProfileNavBar = () => {
  const candidate = useSelector((store) => store.candidate);
  const userData = useSelector((store) => store.auth);

  return (
    <RouteNavbar
      text={[
        "About",
        "Agendas",
        "Credentials",
        "Video",
        "Witnesses",
        "Verification",
      ]}
      routes={[
        "about",
        "agendas",
        "credentials",
        "video",
        "witnesses",
        "verification",
      ]}
      mobWidth="w-full"
    >
      <div className="flex items-center">
        <div className="flex flex-wrap items-center">
          <span className="font-normal text-[28px] underline hidden lg:block">
            <Link to="/">Gymkhana Elections 2024</Link>
          </span>
          <span className="font-normal text-[28px] hidden lg:block">
            &nbsp;/
          </span>
          <span className="font-normal text-[20px] md:text-[24px] sm:text-3xl">
            &nbsp;My Profile
          </span>

          {userData && userData.candidates.length !== 0 && (
            <span className="font-medium uppercase text-sm ml-1 md:ml-0 md:text-2xl lg:text-[24px]">
              &nbsp;({userData.candidates[0].position.title})
            </span>
          )}
        </div>

        <button
          className={`hidden md:block ${
            styles[candidate?.nomination_status]
          } py-1 px-1 sm:px-5 ml-auto mr-4`}
        >
          {`Verification ${capitalizeFirstLetter(
            candidate?.nomination_status
          )}` || "Not Verified"}
        </button>

        <button
          className={`block md:hidden ${
            styles[candidate?.nomination_status]
          } py-1 px-2 sm:px-5 ml-auto mr-4`}
        >
          {`${capitalizeFirstLetter(candidate?.nomination_status)}` ||
            "Not Verified"}
        </button>
        {/* <button
          className={`${styles.preview} py-1 pl-2 pr-1 sm:px-5 mr-4`}
        >
          <span className="flex">
            <div className="flex items-center mr-1">
              <img className="min-w-fit	max-w-fit" src={Eye} />{" "}
            </div>
            <div className="flex items-center mr-1 hidden sm:block">
              Preview
            </div>
          </span>
        </button> */}
      </div>
    </RouteNavbar>
  );
};
export default ProfileNavBar;
