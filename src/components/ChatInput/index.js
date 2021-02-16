import React, { useState } from "react";
import "./index.css";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";
import firebase from "firebase";

function ChatInput({ roomCode }) {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (roomCode) {
      db.collection("rooms").doc(roomCode).collection("messages").add({
        message: input,
        user: user,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setInput("");
  };

  return (
    <div className="chatInput">
      <form>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say Something"
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
