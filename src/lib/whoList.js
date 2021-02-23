const whoList = (playersArray) => {
  let playersList = [];
  for (let i = 0; i < playersArray.length; i++) {
    playersList.push({
      name: playersArray[i].nickname,
      type: "Who",
      description: "",
      img: null,
    });
  }
  return playersList;
};

export default whoList;
