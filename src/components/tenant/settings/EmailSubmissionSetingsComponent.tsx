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
import TextField from '@mui/material/TextField';

function EmailSubmissionSetingsComponent( {settings}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const defaultOriginSetting = "default_origin";
  const emailSubmissionLogsSetting = "email_submission_logs";

  const [defaultOrigin, setDefaultOrigin] = useState("");
  const [emailSubmissionLogs, setEmailSubmissionLogs] = useState(false);

  useEffect(() => {
    const foundOriginSetting = settings.find((settingObj: any) => {
      return settingObj.key === defaultOriginSetting;
    });

    const foundEmailLogSetting = settings.find((settingObj: any) => {
      return settingObj.key === emailSubmissionLogsSetting;
    });

    if(foundOriginSetting){
      setDefaultOrigin(foundOriginSetting.value);
    }

    if(foundEmailLogSetting){
      setEmailSubmissionLogs(Boolean(foundEmailLogSetting.value));
    }

  }, [settings]);

  const updateSetting = (updatedValue: any) => {
    http.patch(`/setting/${defaultOriginSetting}`, {
      value: defaultOrigin
    }).then((res) => {
      // console.log(res.data);
    });

    http.patch(`/setting/${emailSubmissionLogsSetting}`, {
      value: emailSubmissionLogs
    }).then((res) => {
      // console.log(res.data);
    });
  }

  return (
    <>
      <Card variant='outlined'>

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Mail submission settings
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                Togle submission logging on server and set default origin.
              </Typography>
            </Grid>

            <Grid container item xs={6} justifyContent={'center'}>
              <Grid container item xs={12} justifyContent={'center'}>
                <FormControlLabel control={<Switch checked={emailSubmissionLogs} onChange={(e) => {
                  setEmailSubmissionLogs(e.target.checked);
                }} />} label="Log Submissions" />
              </Grid>
              <Grid container item xs={12} justifyContent={'center'}>
                <TextField fullWidth label="Default Origin" variant="outlined" type="text" value={defaultOrigin} onChange={(e) => {
                    setDefaultOrigin(e.target.value);
                }} />
              </Grid>
            </Grid>

            <Grid container item xs={6} justifyContent={'center'}>
              <Grid item xs={12} container direction="row" justifyContent="center" alignItems="center">
                <Button variant="contained" onClick={updateSetting}>Save</Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export {EmailSubmissionSetingsComponent};
