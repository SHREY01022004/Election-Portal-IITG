import React, {useEffect} from "react";
import FAQCard from "./FAQCard";
import { useDispatch, useSelector } from "react-redux";
import { getFaq, deleteFAQ } from "../../../actions/faq";
import { DateConvert } from "../../../utils";
import FAQ from "../../../reducers/faq";
const FAQSection = (props) => {
  const faq = useSelector((state) => state.FAQ);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFaq());
  }, [dispatch]);
  return (
    <div className="flex-row space-y-4 py-8 px-2 break-words">
      <div className="font-medium text-xl">Frequently Asked Questions</div>
      {faq.length !== 0 &&
                faq.map((data, idx) => {
                  return (
         <FAQCard question={data.question} answer={data.answer} />
         );
        })}
    </div>
  );
};

export default FAQSection;