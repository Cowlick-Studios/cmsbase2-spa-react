import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
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
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import DeleteIcon from '@mui/icons-material/Delete';

import { FormCardFieldsComponent } from './FormCardFieldsComponent';

function FormCardComponent( {formSubmission, formSubmissions, setFormSubmissions, adminUsers}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [selectedAdmins, setSelectedAdmins] = useState<any>([]);
  const [origin, setOrigin] = useState("");
  const [enableEmails, setEnableEmails] = useState(false);
  const [selectedCaptcha, setSelectedCaptcha] = useState("none");

  const [recaptchaEnable, setRecaptchaEnable] = useState(false);
  const [recaptchaSecret, setRecaptchaSecret] = useState("");

  const [turnstileEnable, setTurnstileEnable] = useState(false);
  const [turnstileSecret, setTurnstileSecret] = useState("");

  useEffect(() => {
    if(formSubmission.recipients){
      setSelectedAdmins(formSubmission?.recipients?.map((adminUser: any) => {
        return adminUser.id;
      }));
    }
    setOrigin(formSubmission.origin);
    setEnableEmails(formSubmission.send_mail);

    setRecaptchaEnable(formSubmission.recaptcha);
    setRecaptchaSecret(formSubmission.recaptcha_secret);
    setTurnstileEnable(formSubmission.turnstile);
    setTurnstileSecret(formSubmission.turnstile_secret);

    if(formSubmission.recaptcha){
      setSelectedCaptcha('recaptcha');
    } else if(formSubmission.turnstile){
      setSelectedCaptcha('turnstile');
    } else {
      setSelectedCaptcha('none');
    }
  }, [formSubmission]);

  const updateOrigin = () => {
    http.patch(`/form_submission/${formSubmission.id}`, {
      origin: origin !== "" ? origin : null
    }).then((res: any) => {
      console.log(res.data);
    });
  }

  const deleteFormSubmission = (formSubmission: any) => {
    http.delete(`/form_submission/${formSubmission.id}`).then(() => {
      setFormSubmissions(formSubmissions.filter((formSubmissionRecord: any) => {
        return formSubmissionRecord.id !== formSubmission.id;
      }));
    });
  } 

  const selectAdminUser = (e: any) => {
    setSelectedAdmins(e.target.value);

    http.post(`/form_submission/${formSubmission.id}/recipient/sync`, {
      user_ids: e.target.value
    }).then((res: any) => {
      console.log(res.data);
    });
  }

  const updateEnableEmails = (newState: any) => {
    http.patch(`/form_submission/${formSubmission.id}`, {
      send_mail: newState
    }).then((res: any) => {
      setEnableEmails(res.data.form_submission.send_mail);
    });
  }

  const saveTurnstile = () => {
    http.patch(`/form_submission/${formSubmission.id}`, {
      recaptcha: turnstileEnable ? false : recaptchaEnable,
      turnstile: turnstileEnable,
      turnstile_secret: turnstileSecret
    }).then((res: any) => {
      setRecaptchaEnable(res.data.form_submission.recaptcha);
      setRecaptchaSecret(res.data.form_submission.recaptcha_secret);
      setTurnstileEnable(res.data.form_submission.turnstile);
      setTurnstileSecret(res.data.form_submission.turnstile_secret);
    });
  }

  const saveRecaptcha = () => {
    http.patch(`/form_submission/${formSubmission.id}`, {
      turnstile: recaptchaEnable ? false : turnstileEnable,
      recaptcha: recaptchaEnable,
      recaptcha_secret: recaptchaSecret
    }).then((res: any) => {
      setRecaptchaEnable(res.data.form_submission.recaptcha);
      setRecaptchaSecret(res.data.form_submission.recaptcha_secret);
      setTurnstileEnable(res.data.form_submission.turnstile);
      setTurnstileSecret(res.data.form_submission.turnstile_secret);
    });
  }

  return (
    <>
      <Card variant="outlined">

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom>
                {formSubmission?.name}
              </Typography>
            </Grid>
            <Grid container item xs={6} justifyContent="flex-end">
              <IconButton aria-label="delete" onClick={() => {
                deleteFormSubmission(formSubmission);
              }}>
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <FormGroup>
                <FormControlLabel control={<Switch checked={enableEmails} onChange={(e) => {
                  updateEnableEmails(e.target.checked);
                }} />} label="Email Submission" />
              </FormGroup>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <InputLabel>Select Recipients</InputLabel>
                <Select
                  disabled={!enableEmails}
                  fullWidth
                  multiple
                  label="Select Recipients"
                  value={selectedAdmins}
                  onChange={selectAdminUser}
                  renderValue={(selected: any[]) => (
                    <div>
                      {selected?.map((value: any) => (
                        <Chip key={value} label={adminUsers.find((adminUser: any) => {
                          return adminUser.id === value;
                        }).name } />
                      ))}
                    </div>
                  )}
                >
                  {adminUsers?.map((adminUser: any) => (
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

            <Grid item xs={12} container spacing={2} sx={{
              padding: '10px'
            }}>
              <Grid item xs={10}>
                <TextField fullWidth id="outlined-basic" label="Accepted Origin" variant="outlined" type="text" value={origin} size="small" onChange={(e) => {
                  setOrigin(e.target.value);
                }} />
              </Grid>
              <Grid item xs={2}>
                <Button fullWidth variant="contained" onClick={updateOrigin}>Update</Button>
              </Grid>
            </Grid>

            {/* Captcha */}
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">CAPTCHA</FormLabel>
                <RadioGroup
                  row
                  defaultValue="none"
                  value={selectedCaptcha}
                  onChange={(event: any) => {
                    setSelectedCaptcha(event.target.value);
                  }}
                >
                  <FormControlLabel value="none" control={<Radio />} label="NONE" />
                  <FormControlLabel value="recaptcha" control={<Radio />} label="reCAPTCHA" />
                  <FormControlLabel value="turnstile" control={<Radio />} label="Turnstile" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {(selectedCaptcha != "recaptcha") || <>
              <Grid item xs={12}>
                <FormControlLabel control={<Switch checked={recaptchaEnable} onChange={(e) => {
                  setRecaptchaEnable(e.target.checked);
                }} />} label="Enable" />

                <TextField fullWidth label="Secret" variant="outlined" type="text" value={recaptchaSecret} size="small" onChange={(e) => {
                  setRecaptchaSecret(e.target.value);
                }} />

                <Button fullWidth variant="contained" onClick={saveRecaptcha}>Save</Button>
              </Grid>
            </>}

            {(selectedCaptcha != "turnstile") || <>
              <Grid item xs={12}>
                <FormControlLabel control={<Switch checked={turnstileEnable} onChange={(e) => {
                  setTurnstileEnable(e.target.checked);
                }} />} label="Enable" />

                <TextField fullWidth label="Secret" variant="outlined" type="text" value={turnstileSecret} size="small" onChange={(e) => {
                  setTurnstileSecret(e.target.value);
                }} />

                <Button fullWidth variant="contained" onClick={saveTurnstile}>Save</Button>
              </Grid>
            </>}

          </Grid>
        </CardContent>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormCardFieldsComponent formSubmission={formSubmission}/>
          </Grid>
        </Grid>

      </Card>
    </>
  );
}

export {FormCardComponent};
