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
import { addOrUpdateOrgDocs, addOrUpdateUserDocs, getOrgDetails, getUserDetails } from "../utils/firebaseUtils";
import { useEffect } from "react";

const OrgProfileCard = (props) => {
  const uid = props.uid;

  const [orgName, setOrgName] = useState("");
  const [orgHandle, setOrgHandle] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgDescription, setOrgDescription] = useState("");

  const countries = ["India", "USA", "UK"];

  const stringIfUndefined = val => {
    if (val === undefined) return '';
    return val;
  }

  useEffect(() => {
    const loadData = async () => {
      const { data: details } = await getOrgDetails(uid);
      setOrgName(stringIfUndefined(details.orgName));
      setOrgHandle(stringIfUndefined(details.orgHandle));
      setOrgWebsite(stringIfUndefined(details.orgWebsite));
      setOrgDescription(stringIfUndefined(details.orgDescription));
    };
    loadData();
  }, []);

  const updateDetails = async () => {
    const { id, data: details } = await getOrgDetails(uid);
    if (details.orgName !== orgName)
      details.orgName = orgName;
    if (details.orgHandle !== orgHandle)
      details.orgHandle = orgHandle;
    if (details.orgWebsite !== orgWebsite)
      details.orgWebsite = orgWebsite;
    if (details.orgDescription !== orgDescription)
      details.orgDescription = orgDescription;
    addOrUpdateOrgDocs(uid, details);
  };

  const updateOrgName = (event) => {
    setOrgName(event.target.value);
    // updateDetails();
  };
  const updateOrgHandle = (event) => {
    setOrgHandle(event.target.value);
    // updateDetails();
  };
  const updateOrgWebsite = (event) => {
    setOrgWebsite(event.target.value);
    // updateDetails();
  };
  const updateOrgDescription = (event) => {
    setOrgDescription(event.target.value);
    // updateDetails();
  };
  return (
    <React.Fragment>
      <Typography style={{ padding: "4px" }} variant="h4">
        Organisation Profile
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
                <Grid item xs={5}>
                  <TextField
                    id="org-user-name"
                    className="w-100"
                    label="Organization Name"
                    variant="outlined"
                    onChange={updateOrgName}
                    value={orgName}
                  />
                </Grid>
                <Grid item xs={0.5} />
                <Grid item xs={5}>
                  <TextField
                    id="org-handle"
                    className="w-100"
                    label="Organization Handle"
                    value={orgHandle}
                    onChange={updateOrgHandle}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="org-website"
                    className="w-100"
                    label="Organization Website"
                    value={orgWebsite}
                    onChange={updateOrgWebsite}
                />
            </Grid>
            <Grid item>
                <TextField
                id = "org-description"
                className="w-100"
                label="Organization Description"
                value={orgDescription}
                onChange={updateOrgDescription}
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

export default OrgProfileCard;
