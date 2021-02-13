import React from "react";
import "./index.css";

function Message({ message, player, timestamp }) {
  console.log(message);
  return (
    <div className="message">
      <p className="message__user">
        {player?.nickname || "???"}{" "}
        <span className="message__timestamp">
          {new Date(timestamp?.toDate()).toLocaleTimeString("en-US")}
        </span>
      </p>
      <p className="message__text">{message}</p>
    </div>
  );
}

export default Message;
