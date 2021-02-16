import React from "react";
import "./index.css";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";

// List of players that are ready
function WaitingRoom({ user, players, host, setToggleNickname, removePlayer }) {
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
                {user === player.id ? (
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => setToggleNickname(true)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                ) : host === player.id ? (
                  <span> (host)</span>
                ) : host === user ? (
                  <IconButton
                    size="small"
                    onClick={() => removePlayer(player.id)}
                  >
                    <CancelIcon fontSize="inherit" />
                  </IconButton>
                ) : null}
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
