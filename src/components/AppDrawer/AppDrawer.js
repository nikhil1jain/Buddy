import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import UsersList from "../../components/UsersList/UsersList";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";

const AppDrawer = (props) => {
  const { classes, userList, open, setOpen } = props;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon} onClick={handleDrawerClose}>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      {/* <List> */}
      <UsersList userList={userList} />
      {/* </List> */}
      <Divider />
      {/* <List>{secondaryListItems}</List> */}
    </Drawer>
  );
};

export default AppDrawer;
