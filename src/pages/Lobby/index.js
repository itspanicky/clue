import React, { useState, useEffect } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import ShareRoom from "../../components/ShareRoom";
import Nickname from "../../components/Nickname";
import WaitingRoom from "../../components/WaitingRoom";
import Chat from "../../components/Chat";
import ChatInput from "../../components/ChatInput";
import { useStateValue } from "../../StateProvider";
import { Divider } from "@material-ui/core";

function Lobby() {
  const { roomCode } = useParams();
  const [{ user }] = useStateValue();

  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(false);

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

  const changeNickname = (name) => {
    console.log("change nickname");

    // Set or change player's nickname if it is unique
    if (players.some(({ id, nickname }) => id !== user && nickname === name)) {
      setError(true);
    } else {
      setError(false);

      db.collection("rooms").doc(roomCode).collection("players").doc(user).set({
        id: user,
        nickname: name,
        role: "",
      });
    }
  };

  return (
    <div className="lobby">
      <p>LOBBY</p>
      <div className="lobby__container">
        <WaitingRoom user={user} players={players} />
        <Divider orientation="vertical" />
        <div className="lobby__subContainer">
          <Nickname
            nickname={players.find((player) => player.id === user)?.nickname}
            changeNickname={changeNickname}
            error={error}
          />
          <Chat roomCode={roomCode} players={players} />
          <ChatInput roomCode={roomCode} user={user} />
        </div>
      </div>
      <div className="lobby__shareSection">
        <ShareRoom roomCode={roomCode} link={document.URL} />
      </div>
    </div>
  );
}

export default Lobby;
