import React, { useState, useEffect } from "react";
import RoundTable from "../../components/RoundTable";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import db from "../../firebase";

function Game() {
  const { roomCode } = useParams();
  const [{ user }] = useStateValue();

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (roomCode) {
      const roomRef = db.collection("rooms").doc(roomCode);

      // Grab room
      roomRef.onSnapshot((snapshot) => console.log(snapshot.data()));

      // Grab players in room
      roomRef
        .collection("players")
        .onSnapshot((snapshot) =>
          setPlayers(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomCode]);

  return (
    <div>
      <RoundTable players={players} />
    </div>
  );
}

export default Game;
