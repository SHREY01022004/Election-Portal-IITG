import RouteNavbar from "../../Navbars/RouteNavbar";
import Datebox from "../Datebox/Datebox";

const HomeRouteNavBar = () => {
  return (
    <RouteNavbar
      text={[
        "About",
        "Nominations",
        "Statistics",
        // "Winners",
        "Rules and Regulations",
        "Organizers",
      ]}
      routes={[
        "",
        "nominations/vicepresident",
        "stats",
        // "results/vicepresident",
        "rules",
        "organisers",
      ]}
      onOpenMenu={() => {
        document.getElementById("datebox").style.display = "none";
      }}
      onCloseMenu={() => {
        document.getElementById("datebox").style.display = "flex";
      }}
      mobWidth="w-2/3"
    >
      <h1 className="font-normal text-2xl ml-1 md:text-3xl md:ml-0">
        Gymkhana Elections 2024
      </h1>
      <Datebox/>
    </RouteNavbar>
  );
};
export default HomeRouteNavBar;