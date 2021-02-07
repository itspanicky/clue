import React, { useState, useEffect } from 'react'
import './index.css'
import { Button, TextField } from '@material-ui/core'
import db from '../../firebase'
import { nanoid } from 'nanoid'
import { useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import firebase from 'firebase'

// Create a new room or join an existing room
function EnterRoom() {
  const history = useHistory()
  const [{ user }] = useStateValue();

  const [toggle, setToggle] = useState(false) // toggle input for joining room
  const [roomCode, setRoomCode] = useState(null)
  const [invalidCode, setInvalidCode] = useState(null)

  useEffect(() => {
    // clear invalid room code when text field input changes
    setInvalidCode(false)
  }, [roomCode])

  const createRoom = () => {
    // create a new room with a randomized 5 length string room code and reroute to new room

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
    // redirect to room if room exist
    db.collection('rooms').doc(roomCode)
      .get().then((doc) => {
        debugger;
        if (doc.exists) {
          history.push(`/${roomCode}/Lobby`)
        } else {
          setInvalidCode(true)
        }
      })
  }

  return toggle ? (
    <div className='enterRoom'>
      <TextField
        error={invalidCode}
        autoFocus
        label={invalidCode ? 'Room does not exist' : 'Room Code'}
        variant='filled' 
        size='small' 
        value={roomCode}
        onChange={({ target: { value } }) => setRoomCode(value.toUpperCase())}
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
