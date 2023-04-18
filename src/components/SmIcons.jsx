import React, { Component } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Grid, IconButton } from "@mui/material";
import { testing, signInWithGoogle } from "../contexts/newAuth";
import { useNavigate } from "react-router-dom";

const SmIcons = (props) => {
  const navigateTo = useNavigate();
  const marginPadingZero = {
    margin: "0",
    padding: "0",
    textAlign: 'center',
  };
  async function handleGoogleLogIn() {
    await signInWithGoogle();
    navigateTo("/profileCreation");
  };
  return (
    <Grid container>
      <Grid item xs={6} style={marginPadingZero}>
        <IconButton aria-label="delete" onClick={handleGoogleLogIn}>
          <GoogleIcon  sx={{ fontSize: 40 }} />
        </IconButton>
      </Grid>
      <Grid item xs={6} style={marginPadingZero}>
        <IconButton aria-label="delete">
          <GitHubIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SmIcons;
