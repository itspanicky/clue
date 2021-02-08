import React, { useState, useEffect } from 'react'
import { Fab, Grid, TextField } from '@material-ui/core'
import { Check, Link } from '@material-ui/icons'
import Clipboard from 'react-clipboard.js'

// Share room code or link with friends
function ShareRoom({ link, roomCode }) {
  const [copyBtnClicked, setCopyBtnClicked] = useState(false)

  useEffect(() => {
    // change style briefly when button is clicked
    let timeout
    if (copyBtnClicked) {
      timeout = setTimeout(() => {
        setCopyBtnClicked(false)
      }, 1000)
    }
    return () => timeout && clearTimeout(timeout)
  }, [copyBtnClicked])

  return (
    <div className='shareRoom'>

      <Grid container spacing={1} justify='flex-end' alignItems='center'>
        <Grid item>
          <TextField
            variant='outlined'
            size='small'
            defaultValue={roomCode}
            InputProps={{ readOnly: true, style: { width: '90px' } }}
          />
        </Grid>
        <Grid item xs={1.75}>
          <p>Code</p>
        </Grid>
        <Grid item xs={0.5}>
          <p>| Room |</p>
        </Grid>
        <Grid item xs={1.75}>
          <p>Link</p>
        </Grid>
        <Grid item xs={0.5}>
          <Clipboard
            data-clipboard-text={link}
            style={{ border: 'none', background: 'none' }}
          >
            <Fab 
              size='small'
              style={
                copyBtnClicked
                  ? { backgroundColor: '#131313', color: '#f8f8f8' }
                  : { backgroundColor: '#f8f8f8'}
              }
              onClick={() => setCopyBtnClicked(true)}
            >
              {!copyBtnClicked ? (
                <Link />
              ) : (
                <Check />
              )}
            </Fab>
          </Clipboard>
        </Grid>
      </Grid>
    </div>
  )
}

export default ShareRoom
