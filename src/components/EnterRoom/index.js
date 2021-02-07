import React, { useState } from 'react'
import './index.css'
import { Button, TextField } from '@material-ui/core'
import db from '../../firebase'
import { nanoid } from 'nanoid'
import { useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import firebase from 'firebase'

function EnterRoom() {
  const history = useHistory()
  const [{ user }] = useStateValue();

  const [toggle, setToggle] = useState(false)
  const [roomCode, setRoomCode] = useState(null)

  const createRoom = () => {
    // create a new room with a randomized 5 length string room code and reroute to new room
    console.log('createRoom')

    const newRoomCode = nanoid(5).toUpperCase()
    db.collection('rooms').doc(newRoomCode).set({
      host: user,
      players: [],  // { playerId, playerName, role }
      status: 'waiting',  // waiting, playing
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    history.push(`/${newRoomCode}/Lobby`)
  }
  
  const joinRoom = () => {
    console.log('joinRoom')
  }

  return toggle ? (
    <div className='enterRoom'>
      <TextField 
        autoFocus
        label='Room Code' 
        variant='filled' 
        size='small' 
        value={roomCode}
        onChange={({ target: { value } }) => setRoomCode(value)}
        inputProps={{ 
          maxLength: 5, 
          style: { background: '#f8f8f8', textTransform: 'uppercase' } }}
      />
        <Button onClick={joinRoom} className='enterRoom__joinButton' disabled={!roomCode}>
          Join Room
        </Button>
        <Button onClick={() => setToggle(false)} className='enterRoom__backButton'>
          Back
        </Button>
    </div>
  ) : (
    <div className='enterRoom'>
      <Button onClick={createRoom} className='enterRoom__createButton'>
        Create Room
      </Button>
      <Button onClick={() => setToggle(true)} className='enterRoom__joinButton'>
        Join Room
      </Button>
    </div>
  )
}

export default EnterRoom
