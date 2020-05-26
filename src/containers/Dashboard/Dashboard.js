import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { postMessageData, refreshChat, logout } from "../../store/actions";
import AppBarHeader from "../../components/AppBarHeader/AppBarHeader";
import AppDrawer from "../../components/AppDrawer/AppDrawer";
import ChatArea from "../../components/ChatArea/ChatArea";

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

  const [open, setOpen] = React.useState(false);

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
      clearInterval(timer);
    };
  });

  const inputMessageData = (inputMsgData) => {
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
      <AppBarHeader
        classes={classes}
        open={open}
        setOpen={setOpen}
        userList={userList}
        loggedInUser={loggedInUser}
        logoutDispatch={logoutDispatch}
      />
      <AppDrawer
        classes={classes}
        userList={userList}
        open={open}
        setOpen={setOpen}
      />
      <ChatArea
        classes={classes}
        conversations={conversations}
        inputMessageData={inputMessageData}
      />
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
