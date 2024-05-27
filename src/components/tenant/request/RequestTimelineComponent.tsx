import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { LineChart } from '@mui/x-charts/LineChart';

function RequestTimelineComponent( {requests, pastDay}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const componentRef = useRef<HTMLDivElement | null>(null);

  const [componentWidth, setComponentWidth] = useState<any>(500);
  const [numberOfRequestsHour, setNumberOfRequestsHour] = useState<any>([]);

  useEffect(() => {

    console.log(pastDay);
    console.log(groupByHour(pastDay));

    setNumberOfRequestsHour(groupByHour(pastDay));

    if (componentRef.current !== null) {
      setComponentWidth(componentRef.current.offsetWidth);
    }

  }, [componentRef, requests, pastDay]);

  const groupByHour = (requests: any) => {
    const hours: any = {};

    for(const request of requests){
      const hour = new Date(request.created_at).getHours();
      if(hours[hour]){
        hours[hour] = [...hours[hour], request]
      } else {
        hours[hour] = [request]
      }
    }

    let sortedHours: any = [];

    for (const hourRecords in hours) {
      sortedHours = [...sortedHours, hourRecords.length];
    }

    return sortedHours;
  }

  return (
    <>
      <Card ref={componentRef}>
        <LineChart
          xAxis={[{ data: Array.from(Array(numberOfRequestsHour.length).keys()) }]}
          series={[
            {
              data: numberOfRequestsHour,
            },
          ]}
          width={componentWidth}
          height={300}
        />
      </Card>
    </>
  );
}

export {RequestTimelineComponent};
