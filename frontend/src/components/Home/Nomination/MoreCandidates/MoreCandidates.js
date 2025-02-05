import Card from "../../Gallery/Card";
import styles from "./MoreCandidates.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ShuffleArray } from "../../../../utils";
import MoreCandidatesCard from "../../Gallery/MoreCandidatesCard";

const MoreCandidates = (props) => {
  const candidates = useSelector((state) => state.candidates);

  let approved_list = [];
  candidates.forEach((element) => {
    if (element.nomination_status === "approved")
      approved_list = [...approved_list, element];
  });
  approved_list = ShuffleArray(approved_list);
  console.log("--approved candidates--");
  let randomCard;
  if (approved_list.length > 2)
    randomCard = [
      <MoreCandidatesCard person={approved_list[0]} candidateName={approved_list[0]?.user?.name?.replace(/\s+/g, '-').toLowerCase()} id={1} key={1} />,
      <MoreCandidatesCard person={approved_list[1]} candidateName={approved_list[1]?.user?.name?.replace(/\s+/g, '-').toLowerCase()} id={2} key={2} />,
      <MoreCandidatesCard person={approved_list[2]} candidateName={approved_list[2]?.user?.name?.replace(/\s+/g, '-').toLowerCase()} id={3} key={3} />,
    ];
  return (
    <>
      <span className={`${styles.heading} pt-8 pb-6`}>More Candidates</span>
      <div
        className={`relative pb-1 flex gap-4 overflow-y-hidden overflow-x-auto ${styles.container}`}
      >
        {randomCard}
      </div>
    </>
  );
};

export default MoreCandidates;
