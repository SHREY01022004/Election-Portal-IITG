const isUgPgGirl  = (degree, gender)=> {
  const res = [];
  if(gender==="Female") res.push("girl");
  if(["B","Bdes"].includes(degree)) res.push("ug");
  else res.push("pg");
  return res;
}

export const checkVotedAll = (votes, voterInfo) => {
  let done = true;

  Object.keys(votes).forEach((pos) => {
    if (pos !== "err") {
      if(isUgPgGirl(voterInfo.degree,voterInfo.gender).includes(pos)){
        done = done && votes[pos].length !== 0;
      }else{
        done = done && votes[pos] !== 0;
      }
    }
  });
  return done;
};
