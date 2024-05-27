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

function TenantCountComponent({dashboardData}: any) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [tenantCount, setTenantCount] = useState(0);

  useEffect(() => {
    setTenantCount(dashboardData.tenant_count);
  }, [dashboardData])

  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom>
            Tenant count
          </Typography>
          
          <Grid container sx={{
            marginTop: '20px'
          }}>

            <Grid item xs={12}>
              <Typography variant="h4" align='center' gutterBottom>
                {tenantCount}
              </Typography>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default TenantCountComponent;
