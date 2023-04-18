import React, { useEffect, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth, getEmail } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { logout } from "../contexts/newAuth";
import { Grid, Item, TextField, Typography } from "@mui/material";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { getUserDetails } from "../utils/firebaseUtils";
import SideBar from "./Homepage/SideBar/sidelist";
import Editor from "./Post/Editor";
import DisplayTutorial from "./displayTutorial/DisplayTutorial";
import { io } from "socket.io-client"; 


const Dashboard = (socket) => {
  const [error, setError] = useState("");
  const [user, loading, userError] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState({});
  const [userId, setUserId] = useState("");
  const userCollectionRef = collection(db, "users");
  // console.log("email" + email)
  const navigateTo = useNavigate();
  // console.log(user);
  const [tutorials, setTutorials] = useState([]);
  // const [userr, setUser] = useState("");
  // const [socket, setSocket] = useState(null);

  let onlineUsers = [];

  useEffect(() => {
    const getDetails = async () => {
      const data = await getUserDetails(user.uid);
      setUserDetails(data.data);
      setUserId(data.id);
    }
    getDetails()
    
  }, []);
    
  // GETTING THE TUTORIALS
  useEffect(() => {
    const tutorialRef = collection(db, "Tutorials");
    const q = query(tutorialRef, orderBy("createddat", "desc"));
    onSnapshot(q, (snapshot) => {
      // console.log(snapshot);
      const alltutorials = snapshot.docs.map((docs) => ({
        id: docs.id,
        ...docs.data(),
      }));
      setTutorials(alltutorials);
    });
  }, []);


  return (
    <>
     <React.Fragment>
            <Grid container spacing={10} style={{minWidth: '90vw'}}>
              <Grid item xs={3} >
                    <SideBar/>
                </Grid>
             <Grid item xs={8} >
                  { tutorials.length === 0 ? (
                    <Typography> No Tutorials Found</Typography>
                  ): (
                    tutorials.map((tutorial) => (
                      <DisplayTutorial key={tutorial.id} tutorial={tutorial} socket={socket} user ={user}/>
                    ))
                  )}
                  
              </Grid>
            </Grid>
        </React.Fragment>
    </>
  );
};
export default Dashboard;
