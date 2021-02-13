import React, { useState } from "react";
import "./index.css";
import { Button, Grid, TextField } from "@material-ui/core";

// Set nickname for player
function Nickname({ nickname, changeNickname, error }) {
  const [name, setName] = useState(nickname);

  return (
    <div className="nickname">
      <div className="nickname__container">
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item>
            <TextField
              error={error}
              autoFocus
              label={error ? "Name already taken" : nickname ? "" : "Nickname"}
              variant="filled"
              size="small"
              value={name || nickname}
              onChange={({ target: { value } }) => setName(value)}
              inputProps={{
                style: { background: "#f8f8f8" },
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => changeNickname(name)}
              className="nickname__btn"
            >
              {nickname ? "Change" : "Join"}
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Nickname;
