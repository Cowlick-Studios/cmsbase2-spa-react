import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import numeral from 'numeral';

import {axios, http} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';

function DashboardPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [dashboardData, setDashboardData] = useState<any>({});

  useEffect(() => {
    http.get(`/dashboard`).then((res) => {
      setDashboardData(res.data);
    });
  }, []);

  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={4}>
          <p>tenant</p>
        </Grid>
      </Grid>
    </>
  );
}

export {DashboardPage};
