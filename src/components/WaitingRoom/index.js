import React from "react";
import "./index.css";

// List of players that are ready
function WaitingRoom({ user, players }) {
  return (
    <div className="waitingRoom">
      <div className="waitingRoom__container">
        <p className="waitingRoom__title">Who's playing?</p>
        <ul>
          {players.map((player) => (
            <li key={player.id} cols={1}>
              <p
                className={
                  user === player.id
                    ? "waitingRoom__user"
                    : "waitingRoom__player"
                }
              >
                {player.nickname}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <p className="waitingRoom__playerCount">
        {players.length} players in room
      </p>
    </div>
  );
}

export default WaitingRoom;
