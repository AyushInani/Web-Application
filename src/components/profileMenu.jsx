import { Button, Card, CardContent, Grid } from "@mui/material";
import React, { Component } from "react";
import { AccountCircle, Notifications, People } from "@mui/icons-material";
import { IconButton } from "material-ui";
import { useNavigate } from "react-router-dom";

const ProfileMenu = (props) => {
  const navigateTo = useNavigate();
    const itemStyle = {
        color: 'black',
        textTransform: "none",
    }
    const handleProfileClick = () => {
      navigateTo('/userProfile');
    }
    const handleOrgProfileClick = () => {
      navigateTo('/organizationProfile');
    }
  return (
    <Card sx={{ flexGrow: 1 }}>
      <CardContent>
        <Grid container spacing={1} direction="column">
          <Grid item xs={12}>
            <Button onClick={handleProfileClick}  startIcon={<AccountCircle />}  style={itemStyle}>
              Users
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button startIcon={<Notifications />} style={itemStyle}>
              Notifications
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleOrgProfileClick} startIcon={<People />} style={itemStyle}>
              Organizations
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileMenu;
