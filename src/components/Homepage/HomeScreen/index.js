import React, { useState } from 'react';
import Card from 'material-ui/Card';
import { Grid } from '@mui/material';
import SideBar from '../SideBar';
import { SettingsPowerRounded } from '@mui/icons-material';

function HomeScreen({ backgrodun = "white", textColor = "Black" }){
    const classes = useStyles();
    const [openMenu, setOpen] = useState(true);
    const toggleSlider = () => {
        setOpen(!openMenu);
    };
    const [tags, setTags] = useState([
        "HTML",
        "JavaScript",
        "Css",
        "Python",
        "React",
        "Java",
        "HTML",
        "JavaScript",
        "Css",
        "Python",
        "React",
        "HTML",
        "JavaScript",
        "Css",
        "Python",
        "React",
        "Java",
        "HTML",
        "JavaScript",
        "Css",
        "Python",
        "React"
      ]);
    return (
    <div>
    <Grid item className={classes.outerSideBar}>
        <SideBar open={openMenu} toggleSlider={toggleSlider} />
    </Grid>
    </div>
  )
}

export default HomeScreen;
