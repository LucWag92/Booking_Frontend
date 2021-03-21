/*eslint-disable*/
import React, { useContext } from "react";
// react components for routing our app without refresh
import AuthContext from "../../context/auth-context";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { NavLink } from "react-router-dom";

// core components
import Button from "../UtilComponents/Button";

import styles from "../../assets/jss/headerLinksStyle";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const context = useContext(AuthContext);
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <NavLink className={classes.navLink} to="/events">
          Events
        </NavLink>
      </ListItem>
      {context.token && (
        <React.Fragment>
          <ListItem className={classes.listItem}>
            <NavLink className={classes.navLink} to="/bookings">
              Bookings
            </NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              className={classes.navLink}
              onClick={() => context.logout()}
              className="LogOutButton"
            >
              Logout
            </Button>
          </ListItem>
        </React.Fragment>
      )}
      {!context.token && (
        <ListItem className={classes.listItem}>
          <NavLink className={classes.navLink} to="/auth">
            Authentication
          </NavLink>
        </ListItem>
      )}
    </List>
  );
}
