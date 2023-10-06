import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Chip, FormControl, InputLabel } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { EmailCardFieldsComponent } from './EmailCardFieldsComponent';

function EmailCardComponent( {emailSubmission, emailSubmissions, setEmailSubmissions, adminUsers}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [selectedAdmins, setSelectedAdmins] = useState<any>([]);

  useEffect(() => {
    setSelectedAdmins(emailSubmission.recipients.map((adminUser: any) => {
      return adminUser.id;
    }));
  }, [emailSubmission]);

  const deleteEmailSubmission = (emailSubmission: any) => {
    http.delete(`/email_submission/${emailSubmission.id}`).then(() => {
      setEmailSubmissions(emailSubmissions.filter((emailSubmissionRecord: any) => {
        return emailSubmissionRecord.id !== emailSubmission.id;
      }));
    });
  } 

  const selectAdminUser = (e: any) => {
    setSelectedAdmins(e.target.value);

    http.post(`/email_submission/${emailSubmission.id}/recipient/sync`, {
      user_ids: e.target.value
    }).then((res: any) => {
      console.log(res.data);
    });
  }

  return (
    <>
      <Card variant="outlined">

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom>
                {emailSubmission?.name}
              </Typography>
            </Grid>
            <Grid container item xs={6} justifyContent="flex-end">
              <IconButton aria-label="delete" onClick={() => {
                deleteEmailSubmission(emailSubmission);
              }}>
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Recipients</InputLabel>
                <Select
                  fullWidth
                  multiple
                  label="Select Recipients"
                  value={selectedAdmins}
                  onChange={selectAdminUser}
                  renderValue={(selected: any[]) => (
                    <div>
                      {selected.map((value: any) => (
                        <Chip key={value} label={adminUsers.find((adminUser: any) => {
                          return adminUser.id === value;
                        }).name } />
                      ))}
                    </div>
                  )}
                >
                  {adminUsers.map((adminUser: any) => (
                    <MenuItem
                      key={adminUser.id}
                      value={adminUser.id}
                    >
                      {adminUser.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EmailCardFieldsComponent emailSubmission={emailSubmission}/>
          </Grid>
        </Grid>

      </Card>
    </>
  );
}

export {EmailCardComponent};
