import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Message from "../components/message";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const ChatArea = (props) => {
  const classes = useStyles();
  const { conversations } = props;

  return (
    <List className={classes.root}>
      {conversations
        ? Object.values(conversations).map((message, index) => (
            <Message key={index} classes={classes} messageDetails={message} />
          ))
        : "No Conversation"}
    </List>
  );
};

export default ChatArea;
