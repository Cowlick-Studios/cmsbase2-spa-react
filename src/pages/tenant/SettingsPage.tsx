import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import numeral from 'numeral';

import {axios, http} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';

import { CollectionFieldTypesComponent } from '../../components/tenant/settings/CollectionFieldTypesComponent';

function SettingsPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  // useEffect(() => {
  //   http.get(`/dashboard`).then((res) => {
  //     setDashboardData(res.data);
  //   });
  // }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CollectionFieldTypesComponent/>
        </Grid>
      </Grid>
    </>
  );
}

export {SettingsPage};
