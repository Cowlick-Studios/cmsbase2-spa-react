import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
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

function NewFormModalComponent( {open, setOpen, formSubmissions, setFormSubmissions}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [newFormSubmissionName, setNewFormSubmissionName] = useState("");
  const [newFormSubmissionOrigin, setNewFormSubmissionOrigin] = useState("");

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setNewFormSubmissionName("");

    setOpen(false);
  }

  const toggle = () => {
    open ? handleClose() : handleOpen();
  }

  const createNewFormSubmission = () => {
    http.post(`/form_submission`, {
      name: newFormSubmissionName,
      origin: newFormSubmissionOrigin !== "" ? newFormSubmissionOrigin : null
    }).then((res) => {
      setFormSubmissions([...formSubmissions, res.data.form_submission]);
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
              <Grid item xs={12} container spacing={1}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Form Submission Name" variant="outlined" type="text" value={newFormSubmissionName} onChange={(e) => {
                    setNewFormSubmissionName(e.target.value);
                  }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Form Submission Origin" variant="outlined" type="text" value={newFormSubmissionOrigin} onChange={(e) => {
                    setNewFormSubmissionOrigin(e.target.value);
                  }} />
                </Grid>
              </Grid>

              <Grid container item xs={12} gap={1}>
                <Button variant="contained" onClick={createNewFormSubmission}>Create</Button>
                <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
            </Grid>

      </Modal>
    </>
  );
}

export default NewFormModalComponent;
