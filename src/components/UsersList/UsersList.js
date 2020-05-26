import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import User from "../User/User";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const UserList = (props) => {
  const { userList } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <h2>Users</h2>
      <List dense className={classes.root}>
        {userList
          ? Object.values(userList).map((user) => (
              <User key={user.email} userDetails={user} />
            ))
          : "No User Available"}
      </List>
    </React.Fragment>
  );
};

export default UserList;
