import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MessageList from "../../components/MessageList/MessageList";
import ChatInput from "../../components/ChatInput/ChatInput";

const ChatArea = (props) => {
  const { classes, conversations, inputMessageData } = props;
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <MessageList conversations={conversations} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ChatInput inputMessageData={inputMessageData} />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default ChatArea;
