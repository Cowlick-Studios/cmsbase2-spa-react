import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';
import dayjs, { Dayjs } from 'dayjs';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert, {AlertProps} from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { CopyBlock, a11yLight } from 'react-code-blocks';

import { ViewVisitorChartComponent } from '../../components/tenant/ClientAnalytics/ViewVisitorChartComponent';
import { ViewVisitorMapComponent } from '../../components/tenant/ClientAnalytics/ViewVisitorMapComponent';
import { AnalyticsScriptComponent } from '../../components/tenant/ClientAnalytics/AnalyticsScriptComponent';

function ClientAnalyticsPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [analyticsScript, setAnalyticsScript] = useState("");

  return (
    <>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <AnalyticsScriptComponent/>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>

            <Grid item xs={6}>
              <ViewVisitorChartComponent/>
            </Grid>

            <Grid item xs={6}>
              <ViewVisitorMapComponent/>
            </Grid>

          </Grid>
        </Grid>

      </Grid>
    </>
  );
}

export {ClientAnalyticsPage};
