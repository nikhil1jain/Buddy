import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DirectionsIcon from "@material-ui/icons/Directions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: theme.spacing(2),
    width: "73%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const ChatInput = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const { inputMessageData } = props;

  const messageHandler = (event) => {
    setMessage(event.target.value);
  };

  const inputEntered = (event) => {
    event.preventDefault();
    if (message !== "") {
      inputMessageData(message);
    } else {
      setMessage("");
    }
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Enter Message..."
        inputProps={{ "aria-label": "search google maps" }}
        value={message}
        onChange={messageHandler}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        onClick={inputEntered}
      >
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
