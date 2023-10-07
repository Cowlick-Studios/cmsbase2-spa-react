import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import numeral from 'numeral';
import bytesToGb from '../../../utility/bytesToGb';

import {axios, http} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function DailyRequestCountComponent({dashboardData}: any) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  // useEffect(() => {

  // }, [dashboardData])

  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom>
            Daily request count (24h)
          </Typography>
          
          <Grid container sx={{
            marginTop: '20px'
          }}>

            <Grid item xs={12}>
              <Typography variant="h3" component="div" align={'center'}>
                <b>{dashboardData.daily_request_count}</b>
              </Typography>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default DailyRequestCountComponent;

