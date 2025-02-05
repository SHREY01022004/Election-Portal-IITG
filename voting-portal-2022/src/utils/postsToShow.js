const degreeUg = (str) => {
  return str === "B" || str === "Bdes";
};

export const postsToShow = (posts, voterInfo) => {
  console.log("cdcsdc", voterInfo.gender, voterInfo.degree);
  if (voterInfo.gender) {
    if (voterInfo.gender === "Male" && degreeUg(voterInfo.degree)) {
      return [
        posts[0],
        {
          title: "Senate",
          subposts: [
            {
              title: "UG Senator",
              path: "ug",
            },
          ],
        },
      ];
    } else if (voterInfo.gender === "Female" && degreeUg(voterInfo.degree)) {
      return [
        posts[0],
        {
          title: "Senate",
          subposts: [
            {
              title: "UG Senator",
              path: "ug",
            },
            {
              title: "Girl Senator",
              path: "girl",
            },
          ],
        },
      ];
    } else if (voterInfo.gender === "Male" && !degreeUg(voterInfo.degree)) {
      return [
        posts[0],
        {
          title: "Senate",
          subposts: [
            {
              title: "PG Senator",
              path: "pg",
            },
          ],
        },
      ];
    } else if (voterInfo.gender === "Female" && !degreeUg(voterInfo.degree)) {
      return [
        posts[0],
        {
          title: "Senate",
          subposts: [
            {
              title: "PG Senator",
              path: "pg",
            },
            {
              title: "Girl Senator",
              path: "girl",
            },
          ],
        },
      ];
    } else {
      return posts;
    }
  } else {
    return posts;
  }
};
