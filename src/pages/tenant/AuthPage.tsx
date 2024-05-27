import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';

import { ForgotPasswordComponent } from '../../components/tenant/auth/ForgotPassword';
import { ChangeEmailComponent } from '../../components/tenant/auth/ChangeEmail';

function AuthPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  return (
    <>
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={6}>
          <ForgotPasswordComponent/>
        </Grid>
        <Grid item xs={6}>
          <ChangeEmailComponent/>
        </Grid>
      </Grid>
    </>
  );
}

export {AuthPage};
