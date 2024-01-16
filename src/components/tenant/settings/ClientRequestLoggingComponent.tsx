import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { CardContent } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function ClientRequestLoggingComponent( {settings}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const settingName = "client_request_logging";

  const [enableLogging, setEnableLogging] = useState(false);

  useEffect(() => {
    const foundSetting = settings.find((settingObj: any) => {
      return settingObj.key === "request_logging"
    });

    if(foundSetting){
      setEnableLogging(Boolean(foundSetting.value));
    }

  }, [settings]);

  const updateSetting = (updatedValue: any) => {
    http.patch(`/setting/${settingName}`, {
      value: updatedValue
    }).then((res) => {
      // console.log(res.data);
    });
  }

  const clearLogs = () => {
    // http.delete(`/request`).then((res) => {
    //   // console.log(res.data);
    // });
  }

  return (
    <>
      <Card variant='outlined'>

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Client Request Logging
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                Enable the logging of client requests for client analytics and clear request log data.
              </Typography>
            </Grid>

            <Grid container item xs={6} justifyContent={'center'}>
              <FormControlLabel control={<Switch checked={enableLogging} onChange={(e) => {
                setEnableLogging(e.target.checked);
                updateSetting(e.target.checked);
              }} />} label="Log client request data" />
            </Grid>

            <Grid container item xs={6} justifyContent={'center'}>
              <Button variant="contained" onClick={clearLogs} color="error">Clear Logs & Analytics</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export {ClientRequestLoggingComponent};
