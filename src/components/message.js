import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const message = (props) => {
  const { classes, messageDetails } = props;
  console.log("messageDetails", messageDetails);
  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" className={classes.black}>
            {messageDetails.name.charAt(0)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={messageDetails.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              />
              {messageDetails.message}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
};

export default message;
