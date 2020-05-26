import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";

const AppBarHeader = (props) => {
  const {
    classes,
    userList,
    loggedInUser,
    logoutDispatch,
    open,
    setOpen,
  } = props;

  const getLoggedInUserName = () => {
    const userName = userList[loggedInUser.email].firstName;
    return `${userName}'s Dashboard`;
  };

  const logoutButtonHandler = () => {
    logoutDispatch();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {userList &&
          loggedInUser &&
          loggedInUser.email &&
          userList[loggedInUser.email]
            ? getLoggedInUserName()
            : "Dashboard"}
        </Typography>
        <IconButton color="inherit" onClick={logoutButtonHandler}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarHeader;
