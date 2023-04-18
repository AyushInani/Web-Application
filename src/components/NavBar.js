import React, { Component, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { logout, testing } from "../contexts/newAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getUserDetails } from "../utils/firebaseUtils";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Noty from "./displayTutorial/notify";

export default function NavBar(socket) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [user, loading, error] = useAuthState(auth);
  const [uesrDetails, setUserDetails] = useState({});
  const navigateTo = useNavigate();
  const [userId, setUserId] = useState("");
  const userCollectionRef = collection(db, "users");
  const [notifications, setnotifications] = useState([])
  //   const [error, setError] = useState("")


  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logoStyle = {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontWeight: 700,
    color: "inherit",
    textAlign: "center",
    textDecoration: "none",
  };

  async function handleLogout() {
    handleCloseMenu();
    try {
      await logout();
      navigateTo('/login');
    } catch(err) {
      console.log("Error in loging out " + err);
    }
  }
  async function handleAccount() {
    handleCloseMenu();
    try {
      navigateTo('/userProfile');
    } catch(err) {
      console.log("Error in loging out " + err);
    }
  }
  async function handleProfile() {
    handleCloseMenu();
    try {
      navigateTo('/userProfile');
    } catch(err) {
      console.log("Error in loging out " + err);
    }
  }

  async function handleLogin() {
    handleCloseMenu();
    try {
      navigateTo('/login');
    } catch(err) {
      console.log("Error in loging out " + err);
    }
  }
  return (
    <div>
      <AppBar
        position="static"
        style={{ minWidth: '100%', padding: "10px", backgroundColor: "primary" }}
      >
        <Grid container>
          <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
            {/* <Button>Auto Tutorial UI</Button> */}
            <Button component="a" href="/" style={logoStyle}>
              Auto Tutorial UI
            </Button>
          </Grid>
          <Grid item xs={7.5}></Grid>
          <Grid item direction="row">
          
            {user && (
              <Grid item direction="column">
                <Button><Noty width={"30px"} color={"#FFFFFF"} count={10} /></Button>
                <IconButton
                style={{ padding: "0" }}
                id="avatar-button"
                aria-controls={open ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleMenuClick}
              >
                <Avatar sx={{ bgcolor: "#FD841F" }}>{uesrDetails.avatarName}</Avatar>
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "avatar-button",
                }}
              >
                <MenuItem onClick={handleLogin}>Login</MenuItem>
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Grid>
            )}
            </Grid>
            </Grid>
      </AppBar>
    </div>
  );
};

