import { Grid } from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import OrgProfileCard from './orgProfileCard';
import OrgProfileMenu from './orgProfileMenu';

const OrgProfile = (props) => {
    const [user, loading, error] = useAuthState(auth);
    return ( 
        <React.Fragment>
            <Grid container spacing={2} style={{minWidth: '80vw'}}>
                <Grid item xs={3}>
                    <OrgProfileMenu />
                </Grid>
                <Grid item xs={8}>
                    <OrgProfileCard 
                        uid={user.uid}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
     );
}
 
export default OrgProfile;