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
        <ShareRoom roomCode={roomCode} link={document.URL} />
      </div>
      {/* Waiting Room */}
    </div>
  )
}

export default Lobby
