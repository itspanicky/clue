import React from 'react'

// List of players that are ready
function WaitingRoom({ players }) {
  return (
    <div>
      {players.map(player => (
        <div>
          {player.nickname}
        </div>
      ))}
    </div>
  )
}

export default WaitingRoom
