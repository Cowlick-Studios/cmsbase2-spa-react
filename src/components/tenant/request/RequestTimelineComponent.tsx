import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { LineChart } from '@mui/x-charts/LineChart';

function RequestTimelineComponent( {requests, pastDay}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const componentRef = useRef<HTMLDivElement | null>(null);

  const [componentWidth, setComponentWidth] = useState<any>(500);

  useEffect(() => {

    console.log(groupByHour(pastDay));

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

    const sortedHours = [];

    return hours;
  }

  return (
    <>
      <Card ref={componentRef}>
        <LineChart
          xAxis={[{ data: Array.from(Array(24).keys()) }]}
          series={[
            {
              data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
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
