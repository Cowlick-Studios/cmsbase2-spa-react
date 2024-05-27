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

function TotalProvisionedDiskUsageComponent({dashboardData}: any) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [totalDiskSpace, setTotalDiskSpace] = useState(0);
  const [totalDeligatedDiskSpace, setTotalDeligatedDiskSpace] = useState(0);
  const [percentageDeligated, setPercentageDeligated] = useState(0);

  useEffect(() => {
    setTotalDiskSpace(dashboardData.total_disk_space);
    setTotalDeligatedDiskSpace(dashboardData.deligated_database + dashboardData.deligated_file);
    setPercentageDeligated((dashboardData.deligated_database + dashboardData.deligated_file) / dashboardData.total_disk_space);
  }, [dashboardData])

  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom>
            Total provisioned disk usage
          </Typography>
          
          <Grid container sx={{
            marginTop: '20px'
          }}>

            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={percentageDeligated * 100} color={(percentageDeligated * 100) > 80 ? 'error' : 'primary'} />
            </Grid>

            <Grid item xs={6}>
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                {numeral(totalDeligatedDiskSpace / 1024).format('0,0.00')} GB / {numeral(totalDiskSpace / 1024).format('0,0.00')} GB
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography sx={{ fontSize: 12 }} color="text.secondary" align='right' gutterBottom>
                {(percentageDeligated * 100) > 1 ? numeral((percentageDeligated * 100)).format('0,0.00') : '< 1'} %
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default TotalProvisionedDiskUsageComponent;
