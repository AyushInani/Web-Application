import { Button } from "@mui/material";
import React, { Component, useState } from "react";
import OrganizationProfileCreation from "./OrganizationProfileCreation";
import UserProfile from "./UserProfileCreation";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addOrUpdateOrgDocs, addOrUpdateUserDocs } from "../utils/firebaseUtils";

const Profiles = () => {
  const [userName, setuserName] = useState("");
  const [userHandle, setuserHandle] = useState("");
  const [userCountry, setuserCountry] = useState("India");
  const [orgName, setOrgName] = useState("");
  const [orgHandle, setOrgHandle] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgCountry, setOrgCountry] = useState("India");
  const [showOrgs, setShowOrgs] = useState(false);
  const countries = ["India", "USA", "UK"];
  const [user, loading, error] = useAuthState(auth);
  const navigateTo = useNavigate();

  // -------------Organization-------------------
  const updateOrgName = (event) => {
    setOrgName(event.target.value);
  };

  const updateOrgHandle = (event) => {
    setOrgHandle(event.target.value);
  };

  const updateOrgCountry = (event) => {
    setOrgCountry(event.target.value);
  };

  const updateOrgWebsite = (event) => {
    setOrgWebsite(event.target.value);
  };

  // -------------User-----------
  const updateUserName = (event) => {
    setuserName(event.target.value);
  };

  const updateUserHandle = (event) => {
    setuserHandle(event.target.value);
  };

  const updateCountry = (event) => {
    setuserCountry(event.target.value);
  };
  
  const handleUserSubmit = async () => {
    const uid = user.uid;
    var orgDetails = {};
    if (showOrgs) {
      orgDetails = {
        users: [uid],
        orgName,
        orgHandle,
        orgCountry,
        orgWebsite,
      };
      addOrUpdateOrgDocs(user.uid, orgDetails);
    }
    const userDetails = {
      uid,
      userName,
      userHandle,
      userCountry,
      avatarName: userName.length >= 1 ? userName[0]: 'U',
    };
    addOrUpdateUserDocs(user.uid, userDetails);
    navigateTo("/");
  };

  //----------------Profiles---------------------

  const changeOrgDisplay = () => {
    const new_state = !showOrgs;
    // setDispOrg(new_state);
    setShowOrgs(new_state);
  };

  const getOrgButtonText = () => {
    let text;
    if (showOrgs === true) {
      text = "I don't want to create Organization";
    } else {
      text = "I want to Create Organization";
    }
    return text;
  };

  return (
    <div
      className="container w-100"
      style={{
        minWidth: "50vw",
        maxWidth: "80vw",
      }}
    >
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <UserProfile
            userName={userName}
            userHandle={userHandle}
            userCountry={userCountry}
            updateUserName={updateUserName}
            updateUserHandle={updateUserHandle}
            updateCountry={updateCountry}
            handleUserSubmit={handleUserSubmit}
            countries={countries}
          >
            <Button
              className=" w-100 mt-2"
              variant="contained"
              onClick={changeOrgDisplay}
            >
              {getOrgButtonText()}
            </Button>
          </UserProfile>
        </div>
        <div className="col-md-auto">
          {showOrgs && (
            <OrganizationProfileCreation
              orgName={orgName}
              orgHandle={orgHandle}
              orgWebsite={orgWebsite}
              orgCountry={orgCountry}
              updateOrgName={updateOrgName}
              updateOrgHandle={updateOrgHandle}
              updateOrgCountry={updateOrgCountry}
              updateOrgWebsite={updateOrgWebsite}
              countries={countries}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profiles;
