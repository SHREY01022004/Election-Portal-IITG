/**
 * For checking if candidate have selected by user for vote
 */
export const voteValue = (votes, pos, id) => {
  if (pos === "ug" || pos === "pg" || pos === "girl") {
    return votes[pos].includes(id);
  } else {
    return votes[pos] === id * 1;
  }
};

/**
 * For checking if we can go to next or not
 */
export const checkNext = (vote, pos) => {
  if (pos === "ug" || pos === "pg" || pos === "girl") {
    if (pos === "girl") {
      return vote[0] < 0 || (vote.length > 0 && vote.length <= 3);
    } else {
      return vote[0] < 0 || (vote.length > 0 && vote.length <= 7);
    }
  } else {
    return vote !== 0;
  }
};

export const votesToString = (votes) => {
  let voteString = "";
  //const valArray = Array.from(votes.values());
  //console.log(valArray);
  Object.keys(votes).forEach((pos) => {
    const vote = votes[pos];
    if (pos !== "err") {
      if (typeof vote === "number") {
        voteString += vote;
        voteString += ",";
      } else {
        vote.forEach((id) => {
          voteString += id;
          voteString += ",";
        });
      }
    }
  });
  voteString = voteString.slice(0, -1);
  console.log({ voteString });
  return voteString;
};
