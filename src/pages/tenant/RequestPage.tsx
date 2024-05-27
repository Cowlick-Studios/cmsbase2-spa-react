import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import numeral from 'numeral';

import {axios, useAxios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';

import { RequestTimelineComponent } from '../../components/tenant/request/RequestTimelineComponent';
import { RequestTableComponent } from '../../components/tenant/request/RequestTableComponent';

function RequestPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [requests, setRequests] = useState<any>([]);
  const [pastDay, setPastDay] = useState<any>([]);

  useEffect(() => {
    http.get(`/request`).then((res) => {
      console.log(res.data);
      setRequests(res.data.requests);
      setPastDay(res.data.pastDay);
    });
  }, []);

  return (
    <>
      <Grid container gap={2}>
        {/* <Grid item xs={12}>
          <RequestTimelineComponent requests={requests} pastDay={pastDay} />
        </Grid> */}
        <Grid item xs={12}>
          <RequestTableComponent requests={requests} />
        </Grid>
      </Grid>
    </>
  );
}

export {RequestPage};
