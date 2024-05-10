import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';
import { TenantContext } from '../../../contexts/admin/TenantContext';

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

import Modal from '../../utility/Modal';

function NewEmailModalComponent( {open, setOpen, emailSubmissions, setEmailSubmissions}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [newEmailSubmissionName, setNewEmailSubmissionName] = useState("");

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setNewEmailSubmissionName("");

    setOpen(false);
  }

  const toggle = () => {
    open ? handleClose() : handleOpen();
  }

  const createNewEmailSubmission = () => {
    http.post(`/email_submission`, {
      name: newEmailSubmissionName
    }).then((res) => {
      setEmailSubmissions([...emailSubmissions, res.data.email_submission]);
      handleClose();
    });
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={handleClose}>

            <Typography gutterBottom variant="h4" component="h5">
              Create new tenant.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Email Submission Name" variant="outlined" type="text" value={newEmailSubmissionName} onChange={(e) => {
                  setNewEmailSubmissionName(e.target.value);
                }} />
              </Grid>
              <Grid container item xs={12} gap={1}>
                <Button variant="contained" onClick={createNewEmailSubmission}>Create</Button>
                <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
            </Grid>

      </Modal>
    </>
  );
}

export default NewEmailModalComponent;
