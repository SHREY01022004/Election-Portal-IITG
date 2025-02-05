import React from "react";
import { Router, Routes } from "react-router-dom";
import OrganizerCard from "../../components/Home/OrganizerCard/OrganizerCard";
import yashi_img from "../../assets/team_images/yashi.jpg"
import arpit_img from "../../assets/team_images/Arpit.jpg"
import siddhant_img from "../../assets/team_images/Siddhant.jpg"
import avinash_img from "../../assets/team_images/Avinash.jpg"
import danda_img from "../../assets/team_images/Danda.jpg"
import vatan_img from "../../assets/team_images/Vatan.jpg"
import deepak_img from "../../assets/team_images/Deepak.jpg"
import sajal_img from "../../assets/team_images/Sajal.jpg"
import paridhi_img from "../../assets/team_images/Paridhi.jpg"
import naman_img from "../../assets/team_images/Naman.jpg"
import himanshu_img from "../../assets/team_images/Himanshu.jpg"
import rishi_img from "../../assets/team_images/Rishi.jpg"

import { Helmet } from "react-helmet";
const ElectionTeamList = [
  {
    name: "Avinash Reddy Chitti",
    post: "Chief Election Officer",
    contact: "9618648825",
    image: { avinash_img },
    imagename: "avinash_img",
  },
  {
    name: "Danda Akshara",
    post: "Election Officer",
    contact: "9346604074",
    image: { danda_img },
    imagename: "danda_img",
  },
  {
    name: "Vatan Narang",
    post: "Election Officer",
    contact: "7060093034",
    image: { vatan_img },
    imagename: "vatan_img",
  },
  {
    name: "Rishi Jain",
    post: "Videography Head",
    contact: "9755678589",
    image: { rishi_img },
    imagename: "rishi_img",
  },
  {
    name: "Paridhi Baruah",
    post: "Design Head",
    contact: "9864054526",
    image: { paridhi_img },
    imagename: "paridhi_img",
  },
  
  {
    name: "Sajal Aggarwal",
    post: "Media and Content Head",
    contact: "8287775221",
    image: { sajal_img },
    imagename: "sajal_img",
  },
  {
    name: "Naman Kumar Jangid",
    post: "Events and Logistics Head",
    contact: "9672255544",
    image: { naman_img },
    imagename: "naman_img",
  },
  {
    name: "Himanshu Aggarwal",
    post: "Events and Logistics Head",
    contact: "8949937910",
    image: { himanshu_img },
    imagename: "himanshu_img",
  },
  
];

const WebTeamList = [
  {
  name: "Yashi Natu",
    post: "WebDev Head",
    contact: "9752886479",
    image: { yashi_img },
    imagename: "yashi_img",
  },
 
  {
    name: "Arpit Sureka",
    post: "WebDev Head",
    contact: "9737951693",
    image: { arpit_img },
    imagename: "arpit_img",
  },
  {
    name: "Deepak Singh",
    post: "Web Executive",
    contact: "9910497239",
    image: { deepak_img },
    imagename: "deepak_img",
  },
  {
    name: "Siddhant Srivastava",
    post: "Web Executive",
    contact: "9336402936",
    image: { siddhant_img },
    imagename: "siddhant_img",
  },

];

const OrganisersScreen = () => {
  return (
    <>
      <Helmet>
        <title>Organisers | Election Portal</title>
      </Helmet>
      <div className="text-2xl mt-8 flex justify-center sm:justify-start">
        Election Team
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start">
        {ElectionTeamList.map((data, idx) => {
          return (
            <OrganizerCard
              key={idx}
              name={data.name}
              post={data.post}
              contact={data.contact}
              image={data.image}
              imagename={data.imagename}
            />
          );
        })}
      </div>
      <div className="text-2xl mt-8 flex justify-center sm:justify-start">
        Web Development Team
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start">
        {WebTeamList.map((data, idx) => {
          return (
            <OrganizerCard
              key={idx}
              name={data.name}
              post={data.post}
              contact={data.contact}
              image={data.image}
              imagename={data.imagename}
            />
          );
        })}
      </div>
    </>
  );
};
export default OrganisersScreen;
