import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../services/http';
import { AppContext } from '../contexts/AppContext';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function LoginComponent( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    http.post('/auth/login', {
      email: email,
      password: password
    }).then((res) => {
      AppContextState.setAccessToken(res.data.access_token);
      AppContextState.setUser(res.data.user);

      localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setEmail("");
      setPassword("");

      navigate('/');
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
            spacing={2}
          >
            <Grid item xs={12}>
              <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" type="email" onChange={(e) => {
                setEmail(e.target.value);
              }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e) => {
                setPassword(e.target.value);
              }} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" onClick={() => {
            login();
          }}>Login</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default LoginComponent;
