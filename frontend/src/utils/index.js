export const DateConvert = (creation) => {
  return (
    <>
      {new Date(creation).getUTCDate()}/{new Date(creation).getUTCMonth() + 1}/
      {new Date(creation).getUTCFullYear()}
    </>
  );
};

export const TimeConvert = (creation) => {
  let hours = new Date(creation).getUTCHours(); 
  let minutes = new Date(creation).getUTCMinutes();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return (
    <>
      {hours}:{minutes}
    </>
  );
};

export const ShuffleArray = (array)=> {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export const CountTotalVotes = (list) => {
  let total = 0;
  list.forEach(item=>{
    total += item.count;
  })
  return total;
}