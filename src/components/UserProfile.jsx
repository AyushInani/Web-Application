import { Grid } from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import ProfileCard from './profileCard';
import ProfileMenu from './profileMenu';

const UserProfileCard = (props) => {
    const [user, loading, error] = useAuthState(auth);
    return ( 
        <React.Fragment>
            <Grid container spacing={2} style={{minWidth: '80vw'}}>
                <Grid item xs={3}>
                    <ProfileMenu />
                </Grid>
                <Grid item xs={8}>
                    <ProfileCard 
                        uid={user.uid}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
     );
}
 
export default UserProfileCard;