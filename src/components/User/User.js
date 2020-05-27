import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const User = (props) => {
  const { userDetails } = props;
  return (
    <ListItem button data-test="userItem">
      <ListItemAvatar>
        <Avatar>{userDetails.firstName.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={userDetails.firstName} />
    </ListItem>
  );
};

export default User;
