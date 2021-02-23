import whatList from "./whatList";
import whereList from "./whereList";
import whoList from "./whoList";
import board from "./board";
import shuffle from "../services/shuffle";

export const generateOmens = (players) => {
  // returns list of all omen cards
  let whatOmensList = shuffle(whatList);
  let whereOmensList = shuffle(whereList);
  let whoOmensList = shuffle(whoList(players));

  // remove one omen from each list
  const whatBadOmen = whatOmensList.pop();
  const whereBadOmen = whereOmensList.pop();
  const whoBadOmen = whoOmensList.pop();

  const omensList = shuffle([
    ...whatOmensList,
    ...whereOmensList,
    ...whoOmensList,
  ]);

  const badOmensObj = {
    what: whatBadOmen,
    where: whereBadOmen,
    who: whoBadOmen,
  };

  return {
    omensList,
    badOmensObj,
  };
};

export const generateBoard = (players, omensArray) => {
  // omensArray are remaining omen cards that were not distributed to players
  let gameBoard = board;

  // place players on center of the board
  gameBoard[4].players = players;

  // omensArray will be distributed to the board
  while (omensArray.length) {
    let randomIdx = getRandomIdx();
    if (!gameBoard[randomIdx].hiddenCard) {
      // if location on game board does not already have a hidden card
      gameBoard[randomIdx].hiddenCard = omensArray.pop();
    }
  }

  return gameBoard;
};

const getRandomIdx = () => {
  const randomIdx = Math.floor(Math.random() * 10);
  // The center of the board does not have a hidden card slot
  return randomIdx === 4 ? randomIdx + 1 : randomIdx;
};
