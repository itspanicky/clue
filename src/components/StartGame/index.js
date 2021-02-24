import React from "react";
import "./index.css";
import { Button } from "@material-ui/core";
import db from "../../firebase";
import shuffle from "../../services/shuffle";
import { generateOmens, generateBoard } from "../../lib/index";
import { useHistory } from "react-router-dom";

function StartGame({ roomCode, players }) {
  const history = useHistory();

  const startGame = () => {
    console.log("Start Game");

    // generate cards array based on number of players
    let { omensList, badOmensObj } = generateOmens(players);
    // remaining cards not given to players will be placed onto the board
    let remainingCards = [];
    const roomRef = db.collection("rooms").doc(roomCode);
    roomRef
      .collection("players")
      .get()
      .then((querySnapshot) => {
        // # of omen cards each player will receive
        const cardsPerPlayer = Math.round(omensList.length / players.length);

        // distribute evenly, omen cards to each player
        let idx = 0;
        querySnapshot.docs.forEach((doc) => {
          if (idx + cardsPerPlayer > omensList.length) {
            // grab remaining cards not distributed to players
            remainingCards = omensList.slice(idx, omensList.length);
          } else {
            doc.ref.update({
              cards: omensList.slice(idx, idx + cardsPerPlayer),
            });
            // update idx
            idx += cardsPerPlayer;
          }
        });
      });

    // update room document
    roomRef.set({
      status: "play",
      playerOrderList: shuffle(players),
      board: generateBoard(players, remainingCards),
      hiddenCards: remainingCards.length,
      badOmens: badOmensObj,
      turn: 0,
    });

    // redirect route to "/game"
    history.push(`/${roomCode}/game`);
  };

  return (
    <div className="startGame">
      <Button variant="contained" onClick={startGame}>
        START GAME
      </Button>
    </div>
  );
}

export default StartGame;
