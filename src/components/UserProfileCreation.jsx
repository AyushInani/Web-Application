import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { TextField, MenuItem, Button } from "@mui/material";

class UserProfile extends Component {
  render() {
    const {
      userName,
      userHandle,
      userCountry,
      updateUserName,
      updateUserHandle,
      updateCountry,
      handleUserSubmit,
      countries,
      children
    } = this.props;
    // console.log(userName);
    return (
      <Card 
      style={{
        minWidth: "300px",
        maxWidth: "400px",
      }}
      >
        <Card.Body>
          <form>
            <div className="form-group m-4">
              <TextField
                required
                id="user-name"
                className="w-100"
                label="Name"
                variant="outlined"
                onChange={updateUserName}
                value={userName}
              />
            </div>
            <div className="form-group m-4">
              <TextField
                required
                id="user-handle"
                className="w-100"
                label="User Handle"
                variant="outlined"
                onChange={updateUserHandle}
                value={userHandle}
              />
            </div>

            <div className="form-group m-4">
              <TextField
                id="outlined-select-currency"
                className="w-100"
                select
                label="Select"
                value={userCountry}
                onChange={updateCountry}
                helperText="Please select your country"
              >
                {countries.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <Button
              className="w-100"
              variant="contained"
              onClick={handleUserSubmit}
            >
              Submit
            </Button>
          {children}
          </form>
        </Card.Body>
      </Card>
    );
  }
}


export default UserProfile;
