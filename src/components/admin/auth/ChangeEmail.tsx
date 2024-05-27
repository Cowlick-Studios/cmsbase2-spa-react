import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert, {AlertProps, AlertColor} from '@mui/material/Alert';

function ChangeEmailComponent( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor>("info"); // info, warning, error, success

  const resetPassword = () => {
    http.post('/auth/email_change', {
      email: email,
      new_email: newEmail
    }).then((res) => {
      console.log(res.data);
      setSnackbarType("success");
      setSnackbarMessage(res?.data?.message);
      setSnackbarOpen(true);
    }).catch((error) => {
      setSnackbarType("error");
      setSnackbarMessage(error.response?.data?.message);
      setSnackbarOpen(true);

      setEmail("");
      setNewEmail("");
    });
  }

  return (
    <>
      <Card variant="outlined">
        {/* <CardHeader
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016" 
        /> */}
        <CardContent>
          <Grid
            container
            gap={2}
          >
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="h5">
                Change Email
              </Typography>
              {/* <p>Enter your existing account email and the new email address. It is required to verify both via email.</p> */}
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" type="email" value={email} onChange={(e) => {
                setEmail(e.target.value);
              }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="outlined-basic" label="New Email" variant="outlined" type="email" value={newEmail} onChange={(e) => {
                setNewEmail(e.target.value);
              }} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" onClick={() => {
            resetPassword();
          }}>Change</Button>
        </CardActions>
        <CardActions>
          <A to={`/login`}>Back to login</A>
        </CardActions>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {}
        <Alert severity={snackbarType}>{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
}

export {ChangeEmailComponent};
