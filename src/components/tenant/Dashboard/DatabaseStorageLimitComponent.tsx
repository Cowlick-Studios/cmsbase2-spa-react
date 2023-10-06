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

function DatabaseStorageLimitComponent({dashboardData}: any) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [storageLimit, setStorageLimit] = useState(0);
  const [usedStorage, setUsedStorage] = useState(0);
  const [usedStorageDecimal, setUsedStorageDecimal] = useState(0);

  useEffect(() => {
    setStorageLimit(dashboardData.storage_limit_database);
    setUsedStorage(bytesToGb(dashboardData.database_usage));
    setUsedStorageDecimal(bytesToGb(dashboardData.database_usage) / dashboardData.storage_limit_database);
  }, [dashboardData])

  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom>
            Database Usage
          </Typography>
          
          <Grid container sx={{
            marginTop: '20px'
          }}>

            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={(usedStorageDecimal * 100)} color={(usedStorageDecimal * 100) > 80 ? 'error' : 'primary'} />
            </Grid>

            <Grid item xs={6}>
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                {numeral(usedStorage).format('0,0.00')} GB / {numeral(storageLimit).format('0,0.00')} GB
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography sx={{ fontSize: 12 }} color="text.secondary" align='right' gutterBottom>
                {(usedStorageDecimal * 100) > 1 ? numeral((usedStorageDecimal * 100)).format('0,0.00') : '< 1'} %
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default DatabaseStorageLimitComponent;
