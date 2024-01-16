import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import numeral from 'numeral';

import {axios, http} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';

import { CollectionFieldTypesComponent } from '../../components/tenant/settings/CollectionFieldTypesComponent';
import { RequestLoggingComponent } from '../../components/tenant/settings/RequestLoggingComponent';
import { ClientRequestLoggingComponent } from '../../components/tenant/settings/ClientRequestLoggingComponent';

function SettingsPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

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
          <CollectionFieldTypesComponent/>
        </Grid>
        <Grid item xs={12}>
          <RequestLoggingComponent settings={settings}/>
        </Grid>
        <Grid item xs={12}>
          <ClientRequestLoggingComponent settings={settings}/>
        </Grid>
      </Grid>
    </>
  );
}

export {SettingsPage};
