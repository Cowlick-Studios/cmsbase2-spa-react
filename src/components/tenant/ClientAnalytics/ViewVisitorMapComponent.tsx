import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';
import dayjs, { Dayjs } from 'dayjs';

import Grid from '@mui/material/Grid';
import { Chart as GoogleChart } from "react-google-charts";
import ApexChart from "react-apexcharts";
import { Card, CardContent } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function ViewVisitorMapComponent( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [clientAnalytics, setClientAnalytics]: any = useState([]);

  const [chartHeaders, setChartHeaders]: any = useState([]);
  const [chartData, setChartData]: any = useState([]);

  const [startRange, setStartRange] = useState<Dayjs | null>(dayjs().subtract(6, 'day'));
  const [endRange, setEndRange] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    http.get(`/analytics`, {
      params: {
        start: dayjs(startRange).format('YYYY-MM-DD'),
        end: dayjs(endRange).format('YYYY-MM-DD')
      }
    }).then((res) => {
      console.log(res.data);
      setClientAnalytics(res.data.client_analytic);
    });
  }, [startRange, endRange]);

  useEffect(() => {

    setChartHeaders(['Country', 'Views']);

    let countryData: any = {};

    clientAnalytics.forEach((clientAnalytic: any) => {
      clientAnalytic.country_analytics.forEach((countryAnalytic: any) => {
        if(!countryData[countryAnalytic.country_code]){
          countryData[countryAnalytic.country_code] = 0;
        }

        countryData[countryAnalytic.country_code] += countryAnalytic.request_count;
      });
    });

    setChartData(Object.entries(countryData));

    console.log([
      chartHeaders,
      ...chartData
    ]);

  }, [clientAnalytics]);

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>

            {/* Date range selector */}
            <Grid item xs={12}>
              <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">

                <Grid item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Range"
                      value={startRange}
                      onChange={(newValue) => setStartRange(newValue)}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Range"
                      value={endRange}
                      onChange={(newValue) => setEndRange(newValue)}
                    />
                  </LocalizationProvider>
                </Grid>

              </Grid>
            </Grid>

            {/* Chart */}
            <Grid item xs={12}>
              <GoogleChart
                chartType="GeoChart"
                data={[
                  chartHeaders,
                  ...chartData
                ]}
                options={{
                  colorAxis: {colors: ['#e8f2fc', '#1a76d2']},
                }}
                legendToggle
              />
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export {ViewVisitorMapComponent};
