import React, { useState, useEffect } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import ShareRoom from "../../components/ShareRoom";
import Nickname from "../../components/Nickname";
import WaitingRoom from "../../components/WaitingRoom";
import Chat from "../../components/Chat";
import ChatInput from "../../components/ChatInput";
import StartGame from "../../components/StartGame";
import { useStateValue } from "../../StateProvider";
import { Divider } from "@material-ui/core";

function Lobby() {
  const { roomCode } = useParams();
  const [{ user }] = useStateValue();
  const [host, setHost] = useState(null);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(false);
  const [toggleNickname, setToggleNickname] = useState(false);

  const player = players.find((player) => player.id === user); // isNull when you have not joined waiting room

  useEffect(() => {
    if (roomCode) {
      // Grab room
      const roomRef = db.collection("rooms").doc(roomCode);
      roomRef.onSnapshot((snapshot) => setHost(snapshot.data().host));

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
      setToggleNickname(false);
      db.collection("rooms").doc(roomCode).collection("players").doc(user).set({
        id: user,
        nickname: name,
        role: "",
      });
    }
  };

  const removePlayer = (playerId) => {
    db.collection("rooms")
      .doc(roomCode)
      .collection("players")
      .doc(playerId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div className="lobby">
      <p>LOBBY</p>
      <div className="lobby__container">
        <WaitingRoom
          user={user}
          host={host}
          players={players}
          setToggleNickname={setToggleNickname}
          removePlayer={removePlayer}
        />
        <Divider orientation="vertical" />
        <div className="lobby__subContainer">
          {!player || toggleNickname ? (
            <Nickname
              nickname={player?.nickname}
              changeNickname={changeNickname}
              error={error}
            />
          ) : (
            <>
              <Chat roomCode={roomCode} players={players} />
              <ChatInput roomCode={roomCode} user={user} />
            </>
          )}
        </div>
      </div>
      <div className="lobby__footer">
        <StartGame />
        <ShareRoom roomCode={roomCode} link={document.URL} />
      </div>
    </div>
  );
}

export default Lobby;
