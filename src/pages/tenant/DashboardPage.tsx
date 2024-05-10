import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import numeral from 'numeral';
import bytesToGb from '../../utility/bytesToGb';

import {axios, http} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';

import Editor from '../../components/utility/Editor';
import FileSelect from '../../components/utility/FileSelect';

import DatabaseStorageLimitComponent from '../../components/tenant/Dashboard/DatabaseStorageLimitComponent';
import FileStorageLimitComponent from '../../components/tenant/Dashboard/FileStorageLimitComponent';
import DailyRequestCountComponent from '../../components/tenant/Dashboard/DailyRequestCountComponent';

function DashboardPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [dashboardData, setDashboardData] = useState<any>({});

  const imageSelected = (file: any) =>{
    console.log(file);
  }

  useEffect(() => {
    http.get(`/dashboard`).then((res) => {
      setDashboardData(res.data);
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        
        {Object.keys(dashboardData).length > 0 && dashboardData.database_usage !== null ? (
          <Grid item xs={4}>
            <DatabaseStorageLimitComponent dashboardData={dashboardData}/>
          </Grid>
        ) : (<></>)}

        {Object.keys(dashboardData).length > 0 && dashboardData.file_usage !== null ? (
          <Grid item xs={4}>
            <FileStorageLimitComponent dashboardData={dashboardData}/>
          </Grid>
        ) : (<></>)}

        {Object.keys(dashboardData).length > 0 && dashboardData.daily_request_count !== null ? (
          <Grid item xs={4}> 
            <DailyRequestCountComponent dashboardData={dashboardData}/>
          </Grid>
        ) : (<></>)}
        
      </Grid>
    </>
  );
}

export {DashboardPage};
