import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom'
import db from '../../firebase'


function Lobby() {
  const { roomCode } = useParams();

  useEffect(() => {
    if (roomCode) {
      db.collection('rooms').doc(roomCode)
        .onSnapshot(snapshot => (
          console.log(snapshot.data())
        ))
    }
  }, [roomCode])

  return (
    <div>
      LOBBY
    </div>
  )
}

export default Lobby
