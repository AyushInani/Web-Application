import React, { useEffect, useState } from "react";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/newAuth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Profiles from "./components/Profiles";
import SmIcons from "./components/SmIcons";
import NavBar from "./components/NavBar";
import TempComp from "./components/tempComp";
import ProfileMenu from "./components/profileMenu";
import ProfileCard from "./components/profileCard";
import OrgProfileMenu from "./components/orgProfileMenu";
import OrgProfileCard from "./components/orgProfileCard";
import OrgProfile from "./components/orgProfile";
import Editor from './components/Post/Editor';
import UserProfileCard from "./components/UserProfile";
import DisplayTutorial from "./components/displayTutorial/DisplayTutorial";
import { io } from "socket.io-client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import ViewPost from "./components/viewPost/ViewPost";

const App = () => {
  const [user, setUser] = useState("");
  const [username, setusername] = useState("")
  const [socket, setsocket] = useState(null);
  
  useEffect(() => {
    setsocket(io("http://localhost:5000"));

  }, []);

  useEffect(() => {
    socket?.emit("newUser",user)
  }, [socket,user])

  return (
    <React.Fragment>
      {/* <BrowserRouter> */}
      {/* <AuthProvider> */}
      <Router>
        <NavBar style={{ margin: "0" }} socket={socket}/>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh", minWidth: "96vw" }}
        >
          <div>
            <AuthProvider>
              <Routes>
                <Route path="/debug" element={<ViewPost />} />
                <Route path="/organizationProfile" element={<OrgProfile />} />
                <Route path="/userProfile" element={ <UserProfileCard/>}/>
                <Route path="/profileCreation" element={<Profiles />} />
                <Route
                  exact
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/createpost" element={<Editor />} />
                <Route path="/edit" element={<Editor />} />
                <Route path="/displaytutorial" element={<DisplayTutorial  socket={socket} value={user}/>} />
              </Routes>
            </AuthProvider>
          </div>
        </Container>
      </Router>
      {/* </AuthProvider> */}
      {/* </BrowserRouter> */}
    </React.Fragment>
  );
}

export default App;
