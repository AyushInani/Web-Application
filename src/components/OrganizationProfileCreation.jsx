import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { TextField, MenuItem, Button } from "@mui/material";

class OrganizationProfileCreation extends Component {
  render() {
    const {
      updateOrgName,
      updateOrgHandle,
      updateOrgCountry,
      updateOrgWebsite,
      countries,
    } = this.props;
    return (
      <Card
        style={{
          minWidth: "350px",
          maxWidth: "32vw",
        }}
      >
        <Card.Body>
          <form>
            <div className="form-group m-4">
              <TextField
                id="org-user-name"
                className="w-100"
                label="Organization Name"
                variant="outlined"
                onChange={updateOrgName}
              />
            </div>
            <div className="form-group m-4">
              <TextField
                required
                id="ord-user-handle"
                className="w-100"
                label="Organization Handle"
                variant="outlined"
                onChange={updateOrgHandle}
              />
            </div>

            <div className="form-group m-4">
              <TextField
                id="outlined-select-currency"
                className="w-100"
                select
                label="Select"
                value={"India"}
                onChange={updateOrgCountry}
                helperText="Please select your organization country"
              >
                {countries.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="form-group m-4">
              <TextField
                required
                id="org-website"
                className="w-100"
                label="Organization Website"
                variant="outlined"
                onChange={updateOrgWebsite}
              />
            </div>
          </form>
        </Card.Body>
      </Card>
    );
  }
}

export default OrganizationProfileCreation;
