import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';
import dayjs, { Dayjs } from 'dayjs';

import { Chart } from "react-google-charts";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert, {AlertProps} from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ClientAnalyticsPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [analyticsResponse, setAnalyticsResponse]: any = useState({});

  // Country data
  const [countryRequestData, setCountryRequestData]: any = useState([]);
  const [mapStart, setMapStart] = useState<Dayjs>(dayjs().subtract(1, 'day'));
  const [mapEnd, setMapEnd] = useState<Dayjs>(dayjs());

  // Monthly
  const [monthlychartData, setMonthlyChartData]: any = useState([]);

  useEffect(() => {
    http.get(`/analytics`).then((res) => {
      setAnalyticsResponse(res.data);
    });
  }, []);

  useEffect(() => {
    // set map data
    const countryRequestCount: any = {};
    analyticsResponse?.all_requests?.forEach((requestData: any) => {
      if(dayjs(requestData.created_at) >= mapStart && dayjs(requestData.created_at) <= mapEnd){
        if(countryRequestCount[requestData.country_code]){
          countryRequestCount[requestData.country_code] += 1
        } else {
          countryRequestCount[requestData.country_code] = 1;
        }
      }
    });
    setCountryRequestData(Object.entries(countryRequestCount));
  }, [analyticsResponse, mapStart, mapEnd]);

  useEffect(() => {
    const monthlyRequests: any = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
    }
    analyticsResponse?.all_requests?.forEach((requestData: any) => {
      if(dayjs(requestData.created_at) > dayjs().subtract(1, 'year')){
        if(monthlyRequests[dayjs(requestData.created_at).month()]){
          monthlyRequests[dayjs(requestData.created_at).month()] += 1
        } else {
          monthlyRequests[dayjs(requestData.created_at).month()] = 1;
        }
      }
    });

    let monthlyRequestsArr: any[] = Object.entries(monthlyRequests);

    while(monthlyRequestsArr[monthlyRequestsArr.length - 1][0] != dayjs().month()){
      monthlyRequestsArr.unshift(monthlyRequestsArr.pop());
    }

    setMonthlyChartData(monthlyRequestsArr.map(val => {
      return [monthOrder[val[0]], val[1]];
    }));
  }, [analyticsResponse]);

  const copyAnalyticsScript = () => {
    navigator.clipboard.writeText(`
<script>
  // Initialize the agent at application startup.
  const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
    .then(FingerprintJS => FingerprintJS.load());

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => {
      // Send request data
      fetch("${AppContextState.url}/tenant/${AppContextState.tenant}/analytics/request", {
        method: "POST",
        body: JSON.stringify({
          fingerprint: result.visitorId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Accept": "application/json"
        }
      });
    })
</script>
    `);

    setSnackbarMessage("Copied analytics script to clipboard");
    setSnackbarOpen(true);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => {copyAnalyticsScript()}}>Copy Embedded Analytics Script Tag</Button>
        </Grid>

        <Grid item xs={12}>
          {analyticsResponse ? (
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <Card>
                  <CardContent>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Chart
                          chartType="LineChart"
                          data={[
                            ['Month', 'Views'],
                            ...monthlychartData
                          ]}
                          options={{
                            colorAxis: { colors: ["#e8f2fc", "#1a76d2"] },
                            defaultColor: "#f5f5f5",
                          }}
                          width="100%"
                          height="400px"
                          // legendToggle
                        />
                      </Grid>
                    </Grid>

                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Start" 
                            value={mapStart}
                            onChange={(newValue) => setMapStart(dayjs(newValue))}
                          />
                        </LocalizationProvider>
                      </Grid>
      
                      <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker 
                            label="End" 
                            value={mapEnd}
                            onChange={(newValue) => setMapEnd(dayjs(newValue))}
                          />
                        </LocalizationProvider>
                      </Grid>
      
                      <Grid item xs={12}>
                        <Chart
                          chartType="GeoChart"
                          data={[
                            ['Country', 'Popularity'],
                            ...countryRequestData
                          ]}
                          options={{
                            colorAxis: { colors: ["#e8f2fc", "#1a76d2"] },
                            defaultColor: "#f5f5f5",
                          }}
                          width="100%"
                          height="400px"
                          // legendToggle
                        />
                      </Grid>
      
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          ) : (
            <></>
          )}

        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="info">{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
}

export {ClientAnalyticsPage};
