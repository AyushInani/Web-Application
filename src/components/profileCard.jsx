import {
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FacebookRounded, GitHub, LinkedIn } from "@mui/icons-material";
import { addOrUpdateUserDocs, getUserDetails } from "../utils/firebaseUtils";
import { useEffect } from "react";

const ProfileCard = (props) => {
  const uid = props.uid;

  const [userName, setUserName] = useState("Name");
  const [userCountry, setUserCountry] = useState("India");
  const [description, setDesc] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("www.facebook.com/user");
  const [linkedin, setLinkedin] = useState("www.linkedin.com/user");
  const [github, setGithub] = useState("www.github.com/user");

  const countries = ["India", "USA", "UK"];

  useEffect(() => {
    const loadData = async () => {
      const { data: details } = await getUserDetails(uid);
      setUserName(details.userName);
      setUserCountry(details.userCountry);
      setDesc(details.description);
      setWebsite(details.website);
      setFacebook(details.facebook);
      setLinkedin(details.linkedin);
      setGithub(details.github);
    };
    loadData();
  }, []);

  const updateDetails = async () => {
    const { id, data: details } = await getUserDetails(uid);
    if (details.userName !== userName) details.userName = userName;
    if (details.userCountry !== userCountry) details.userCountry = userCountry;
    if (details.description !== description) details.description = description;
    if (details.website !== website) details.website = website;
    if (details.facebook !== facebook) details.facebook = facebook;
    if (details.linkedin !== linkedin) details.linkedin = linkedin;
    if (details.github !== github) details.github = github;
    addOrUpdateUserDocs(uid, details);
  };

  const updateName = (event) => {
    setUserName(event.target.value);
    // updateDetails();
  };
  const updateCountry = (event) => {
    setUserCountry(event.target.value);
    // updateDetails();
  };
  const updateWebsite = (event) => {
    setWebsite(event.target.value);
    // updateDetails();
  };
  const updateDesc = (event) => {
    setDesc(event.target.value);
    // updateDetails();
  };
  const updateFacebook = (event) => {
    setFacebook(event.target.value);
    // updateDetails();
  };
  const updateLinkedin = (event) => {
    setLinkedin(event.target.value);
    // updateDetails();
  };
  const updateGithub = (event) => {
    setGithub(event.target.value);
    // updateDetails();
  };
  return (
    <React.Fragment>
      <Typography style={{ padding: "4px" }} variant="h4">
       User Profile
      </Typography>
      <Card sx={{ flexGrow: 1 }}>
        <CardContent>
          <Grid container spacing={1} direction="column">
            <Grid
              item
              xs={12}
              style={{ minWidth: "500px", paddingBottom: "10px" }}
            >
              <Grid container>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="user-name"
                    className="w-100"
                    label="Name"
                    variant="outlined"
                    onChange={updateName}
                    value={userName}
                  />
                </Grid>
                <Grid item xs={0.5} />
                <Grid item xs={4}>
                  <TextField
                    id="outlined-select-currency"
                    className="w-100"
                    select
                    label="Country of residence"
                    value={userCountry}
                    onChange={updateCountry}
                  >
                    {countries.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              id="website-description"
              item
              xs={12}
              style={{ minWidth: "500px", paddingBottom: "10px" }}
            >
              <Grid container>
                <Grid item xs={4}>
                  <TextField
                    id="website"
                    className="w-100"
                    label="Website"
                    variant="outlined"
                    onChange={updateWebsite}
                    value={website}
                  />
                </Grid>
                <Grid item xs={0.5} />
                <Grid item xs={4}>
                  <TextField
                    id="outlined-select-currency"
                    className="w-100"
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={updateDesc}
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: "10px" }}>
              <TextField
                id="facebook"
                className="w-100"
                label="Facebook"
                variant="outlined"
                onChange={updateFacebook}
                value={facebook}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FacebookRounded />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: "10px" }}>
              <TextField
                id="linkedin"
                className="w-100"
                label="LinkedIn"
                variant="outlined"
                onChange={updateLinkedin}
                value={linkedin}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedIn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: "10px" }}>
              <TextField
                id="github"
                className="w-100"
                label="Github"
                variant="outlined"
                onChange={updateGithub}
                value={github}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GitHub />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Button onClick={updateDetails} className="w-100 mt-2" type="submit">
                Submit
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default ProfileCard;
