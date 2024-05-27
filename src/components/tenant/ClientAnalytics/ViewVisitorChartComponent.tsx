import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';
import dayjs, { Dayjs } from 'dayjs';

import Grid from '@mui/material/Grid';
import { Chart as GoogleChart } from "react-google-charts";
import ApexChart from "react-apexcharts";
import { Card, CardContent, CardHeader } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

type ChartFrequencies = 'D' | 'W' | 'M' | 'Y';

function ViewVisitorChartComponent( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [clientAnalytics, setClientAnalytics]: any = useState([]);
  const [chartFrequency, setChartFrequency]: any = useState<ChartFrequencies>('D');
  const [chartOptions, setChartOptions]: any = useState({});
  const [chartSeries, setChartSeries]: any = useState([]);

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
    switch(chartFrequency) {
      case 'D':
        setChartDays();
        break;
      case 'W':
        setChartWeeks();
        break;
      case 'M':
        setChartMonths();
        break;
      case 'Y':
        setChartYears();
        break;
      default:
        setChartDays();
    }
  }, [clientAnalytics]);

  const setChartDays = () => {
    // Options
    setChartOptions({
      chart: {
        id: "view-visitor-chart"
      },
      xaxis: {
        categories: clientAnalytics.map((clientAnalytic: any) => {
          return dayjs(clientAnalytic.date).format('MMM D');
        })
      }
    });

    // Series
    setChartSeries([{
      name: 'views',
      data: clientAnalytics.map((clientAnalytic: any) => {
        return {
          x: 'Views',
          y: clientAnalytic.request_count,
          goals: [
            {
              name: 'Visitors',
              value: clientAnalytic.fingerprints.length,
              strokeColor: '#febc3b'
            }
          ]
        };
      })
    }])
  }

  const setChartWeeks = () => {
    
  }

  const setChartMonths = () => {

  }

  const setChartYears = () => {

  }

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>

            {/* Format (days, weeks, moths, years) */}
            {/* <Grid item xs={12}>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button disabled={chartFrequency === 'D'} onClick={() => setChartFrequency('D')}>Days</Button>
                <Button disabled={chartFrequency === 'W'} onClick={() => setChartFrequency('W')}>Weeks</Button>
                <Button disabled={chartFrequency === 'M'} onClick={() => setChartFrequency('M')}>Months</Button>
                <Button disabled={chartFrequency === 'Y'} onClick={() => setChartFrequency('Y')}>Years</Button>
              </ButtonGroup>
            </Grid> */}

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
              <ApexChart
              type="bar"
              options={chartOptions}
              series={chartSeries}
              />
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export {ViewVisitorChartComponent};
