import React, { useEffect} from 'react'
import './index.css'
import { useParams } from 'react-router-dom'
import db from '../../firebase'
import ShareRoom from '../../components/ShareRoom'

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
    <div className='lobby'>
      <div className="lobby__shareSection">
        <p>Play with Friends!</p>
        <ShareRoom textFor='Link' textToCopy={document.URL} />
        <ShareRoom textFor='Room Code' textToCopy={roomCode} />
      </div>
      {/* Waiting Room */}
    </div>
  )
}

export default Lobby
