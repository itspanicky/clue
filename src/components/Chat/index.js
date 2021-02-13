import React, { useState, useEffect } from "react";
import "./index.css";
import db from "../../firebase";
import Message from "../Message";

function Chat({ roomCode, players }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomCode) {
      const roomRef = db.collection("rooms").doc(roomCode);
      roomRef
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomCode]);

  return (
    <div className="chat">
      <div className="chat__container">
        {players.length ? (
          <div className="chat__messages">
            {messages.map(({ message, user, timestamp }) => (
              <Message
                message={message}
                player={players.filter((player) => player.id === user)[0]}
                timestamp={timestamp}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Chat;
