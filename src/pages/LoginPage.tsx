import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';

import {axios, http} from '../services/http';
import { AppContext } from '../contexts/AppContext';

import Grid from '@mui/material/Grid';

import LoginComponent from '../components/LoginComponent';

function LoginPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  return (
    <>
      <Grid
        container
        gap={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <LoginComponent/>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginPage;
