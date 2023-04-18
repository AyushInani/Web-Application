import { Button, Card, CardContent, Grid } from "@mui/material";
import React, { Component } from "react";
import {
  AccountCircle,
  Settings,
  Notifications,
  People,
} from "@mui/icons-material";
import { IconButton } from "material-ui";
import { useNavigate } from "react-router-dom";

const OrgProfileMenu = (props) => {
  const navigateTo = useNavigate();
  const itemStyle = {
    color: "black",
    textTransform: "none",
  };
  const handleUserClick = () => {
    navigateTo("/userProfile");
  };
  const handleNotificationsClick = () => {
    console.log("clicked");
  };
  return (
    <Card sx={{ flexGrow: 1 }}>
      <CardContent>
        <Grid container spacing={1} direction="column">
          <Grid item xs={12}>
            <Button onClick={handleUserClick}  startIcon={<AccountCircle />} style={itemStyle}>
              Users
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleNotificationsClick}  startIcon={<Notifications />} style={itemStyle}>
              Notifications
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button  startIcon={<People />} style={itemStyle}>Organisations</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrgProfileMenu;
