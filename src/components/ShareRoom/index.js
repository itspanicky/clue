import React, { useState, useEffect } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import Clipboard from 'react-clipboard.js'

function ShareRoom({ textFor, textToCopy }) {
  const [copyBtnClicked, setCopyBtnClicked] = useState(false)
  console.log(textToCopy)
  useEffect(() => {
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
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={2}>
          <p>{textFor}:</p>
        </Grid>
        <Grid item xs={5}>
          <TextField
            defaultValue={textToCopy}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={2}>
          <Clipboard
            data-clipboard-text={textToCopy}
            style={{ border: "none", background: "none" }}
          >
            <Button
              variant="contained"
              color="default"
              style={
                copyBtnClicked
                  ? { backgroundColor: '#228d54', color: '#fff' }
                  : {}
              }
              onClick={() => setCopyBtnClicked(true)}
              >
              {!copyBtnClicked ? 'Copy' : 'Copied'}
          </Button>
          </Clipboard>
        </Grid>
      </Grid>
    </div>
  )
}

export default ShareRoom
