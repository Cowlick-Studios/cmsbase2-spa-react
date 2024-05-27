import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import numeral from 'numeral';

import {axios, useAxios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';

import { FieldTypesComponent } from '../../components/tenant/settings/FieldTypesComponent';
import { RequestLoggingComponent } from '../../components/tenant/settings/RequestLoggingComponent';
import { ClientRequestLoggingComponent } from '../../components/tenant/settings/ClientRequestLoggingComponent';
import { PublicRegisterComponent } from '../../components/tenant/settings/PublicRegisterComponent';
import { EmailSubmissionSetingsComponent } from '../../components/tenant/settings/EmailSubmissionSetingsComponent';

function SettingsPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [settings, setSettings] = useState<any>([]);

  useEffect(() => {
    http.get(`/setting`).then((res) => {
      setSettings(res.data.settings);
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FieldTypesComponent/>
        </Grid>
        <Grid item xs={12}>
          <PublicRegisterComponent settings={settings}/>
        </Grid>
        <Grid item xs={12}>
          <RequestLoggingComponent settings={settings}/>
        </Grid>
        <Grid item xs={12}>
          <ClientRequestLoggingComponent settings={settings}/>
        </Grid>
        <Grid item xs={12}>
          <EmailSubmissionSetingsComponent settings={settings}/>
        </Grid>
      </Grid>
    </>
  );
}

export {SettingsPage};
