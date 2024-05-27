import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import numeral from 'numeral';
import bytesToGb from '../../../utility/bytesToGb';

import {axios, useAxios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function FileStorageLimitComponent({dashboardData}: any) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [storageLimit, setStorageLimit] = useState(0);
  const [usedStorage, setUsedStorage] = useState(0);
  const [usedStorageDecimal, setUsedStorageDecimal] = useState(0);

  useEffect(() => {
    setStorageLimit(dashboardData.tenant.storage_limit_file * 1024);
    setUsedStorage(dashboardData.file_usage);
    setUsedStorageDecimal(dashboardData.file_usage / (dashboardData.tenant.storage_limit_file * 1024));
  }, [dashboardData])

  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom>
            File Usage
          </Typography>
          
          <Grid container sx={{
            marginTop: '20px'
          }}>

            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={(usedStorageDecimal * 100)} color={(usedStorageDecimal * 100) > 80 ? 'error' : 'primary'} />
            </Grid>

            <Grid item xs={6}>
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                {numeral(usedStorage / 1024).format('0,0.00')} GB / {numeral(storageLimit / 1024).format('0,0.00')} GB
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

export default FileStorageLimitComponent;

