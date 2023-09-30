import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import numeral from 'numeral';

import {axios, http} from '../services/http';
import { AppContext } from '../contexts/AppContext';

import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function DashboardPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [totalDiskSpace, setTotalDiskSpace] = useState(0);
  const [usedDiskSpace, setUsedDiskSpace] = useState(0);
  const [diskUsagePercentage, setDiskUsagePercentage] = useState(0);

  useEffect(() => {
    http.get(`/dashboard`).then((res) => {
      setUsedDiskSpace(res.data.total_disk_space - res.data.free_disk_space);
      setTotalDiskSpace(res.data.total_disk_space);
      setDiskUsagePercentage(((res.data.total_disk_space - res.data.free_disk_space) / res.data.total_disk_space) * 100);
    });
  }, [])

  const bytesToGb = (bytes: number) => {
    return bytes / 1073741820;
  }

  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom>
                Total server disk usage
              </Typography>
              
              <Grid container sx={{
                marginTop: '20px'
              }}>

                <Grid item xs={12}>
                  <LinearProgress variant="determinate" value={diskUsagePercentage} color={diskUsagePercentage > 80 ? 'error' : 'primary'} />
                </Grid>

                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                    {numeral(bytesToGb(usedDiskSpace)).format('0,0.00')} GB / {numeral(bytesToGb(totalDiskSpace)).format('0,0.00')} GB
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 12 }} color="text.secondary" align='right' gutterBottom>
                    {numeral(diskUsagePercentage).format('0,0.00')} %
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardPage;
