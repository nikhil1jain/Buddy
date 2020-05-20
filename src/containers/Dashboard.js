import React, { useEffect } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UsersListComponent from "../components/UsersListComponent";
import ChatArea from "../components/ChatArea";
import ChatInput from "../components/ChatInput";
import { postMessageData, refreshChat, logout } from "../store/actions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Buddy App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const Dashboard = (props) => {
  console.log("userList", props.userList);
  const {
    userList,
    loggedInUser,
    isLoggedIn,
    conversations,
    postMessageDataDispatch,
    refreshChatDispatch,
    logoutDispatch,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    if (!isLoggedIn) {
      props.history.push("/");
    }
  });
  useEffect(() => {
    let timer;
    if (isLoggedIn) {
      timer = setInterval(() => {
        refreshChatDispatch();
      }, 5000);
    }

    return () => {
      console.log("Dashboard Unmounted");
      clearInterval(timer);
    };
  });
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getLoggedInUserName = () => {
    const userName = userList[loggedInUser.email].firstName;
    return `${userName}'s Dashboard`;
  };

  const logoutButtonHandler = () => {
    logoutDispatch();
  };

  const inputMessageData = (inputMsgData) => {
    console.log(inputMsgData);
    if (
      userList &&
      loggedInUser &&
      loggedInUser.email &&
      userList[loggedInUser.email].firstName
    ) {
      const msgObj = {
        message: inputMsgData,
        loggedInUser: loggedInUser.email,
        name: userList[loggedInUser.email].firstName,
      };
      postMessageDataDispatch(msgObj);
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
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
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
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
          <IconButton color="inherit">
            <ExitToAppIcon onClick={logoutButtonHandler} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {/* <List> */}
        <UsersListComponent userList={userList} />
        {/* </List> */}
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ChatArea conversations={conversations} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              {/* <Paper className={classes.paper}> */}
              <ChatInput inputMessageData={inputMessageData} />
              {/* </Paper> */}
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  // signDataDispatch: (payload) => dispatch(signUpAction(payload)),
  postMessageDataDispatch: (payload) => dispatch(postMessageData(payload)),
  refreshChatDispatch: () => dispatch(refreshChat()),
  logoutDispatch: () => dispatch(logout()),
});

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
    userList: state.userList,
    isLoggedIn: state.isLoggedIn,
    conversations: state.conversations,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
