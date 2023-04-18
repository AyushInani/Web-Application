import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import ReactHtmlParser from "react-html-parser";

const ViewPost = (props) => {
  const [tut, setTut] = useState({});
  const [liked, setLiked] = useState(false);
  var { title } = props;
  title = "The College of CSE";

  const handleLike = (type) => {
    // const username = user.email.toString();
    // const recname = tutorial.tutorial.createdby.toString();
    setLiked(true);
    // socket.emit("sendLike", {
    //   senderName: value,
    //   receiverName: recname,
    //   type,
    // })
  };

  const handleunLike = () => {
    setLiked(false);
  };

  useEffect(() => {
    const tutorialRef = collection(db, "Tutorials");
    const q = query(tutorialRef, orderBy("createddat", "desc"));
    onSnapshot(q, (snapshot) => {
      // console.log(snapshot);
      const alltutorials = snapshot.docs.map((docs) => {
        if (docs.data().title === title) {
          setTut({ id: docs.id, ...docs.data() });
        }
      });
      //   setTut(alltutorials);
    });
  }, []);
  //   const tut = tutorials[0];
  console.log(tut);
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        alignItems: "normal",
        justifyContent: "normal",
      }}
    >
      <Card>
        <CardMedia
          component="img"
          height="240"
          image={tut ? tut.imgurl : undefined}
        />
        <Grid container>
          <Grid
            item
            xs={9}
            display="flex"
            style={{ flexDirection: "column", padding: "10px" }}
          >
            <Typography gutterBottom varient="h5" component="div">
              <Avatar>
                <AccountCircleRoundedIcon />
              </Avatar>
              {tut.createdby}
              <Typography variant="body2" color="text.secondary">
                from {tut.orgName}
              </Typography>
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            display="flex"
            style={{ flexDirection: "column", padding: "4px" }}
          >
            <CardActions>
              {liked ? (
                <Button size="small" onClick={handleunLike}>
                  <ThumbUpIcon />
                </Button>
              ) : (
                <Button size="small" onClick={() => handleLike(1)}>
                  <ThumbUpOffAltIcon />
                </Button>
              )}
              <Button size="small" onClick={() => handleLike(2)}>
                <CommentOutlinedIcon />
              </Button>
              <Button size="small" onClick={() => handleLike(3)}>
                <ShareOutlinedIcon></ShareOutlinedIcon>
              </Button>
            </CardActions>
          </Grid>
        </Grid>

        <CardContent style={{display: "flex", justifyContent: "center"}}>
          <div>{ReactHtmlParser(tut.description)}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewPost;
