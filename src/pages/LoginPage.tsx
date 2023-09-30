import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';

import {axios, http} from '../services/http';
import { AppContext } from '../contexts/AppContext';

import Grid from '@mui/material/Grid';

import {LoginComponent as AdminLoginComponent} from '../components/admin/LoginComponent';
import {LoginComponent as TenantLoginComponent} from '../components/tenant/LoginComponent';

function LoginPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  return (
    <>
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={6}>
          <AdminLoginComponent/>
        </Grid>
        <Grid item xs={6}>
          <TenantLoginComponent/>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginPage;
