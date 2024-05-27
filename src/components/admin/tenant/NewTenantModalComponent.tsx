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

import Modal from '../../utility/Modal';

function NewTenantModalComponent( {open, setOpen}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const TenantContextState: any = useContext(TenantContext);
  const http = useAxios();

  const [newTenantName, setNewTenantName] = useState("");
  const [newTenantFileLimit, setNewTenantFileLimit] = useState(1);
  const [newTenantDatabaseLimit, setNewTenantDatabaseLimit] = useState(1);
  const [newTenantAdminEmail, setNewTenantAdminEmail] = useState("");
  const [newTenantAdminPassword, setNewTenantAdminPassword] = useState("");

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setNewTenantName("");
    setNewTenantFileLimit(1);
    setNewTenantDatabaseLimit(1);
    setNewTenantAdminEmail("");
    setNewTenantAdminPassword("");

    setOpen(false);
  }

  const toggle = () => {
    open ? handleClose() : handleOpen();
  }

  const createNewTenant = () => {
    http.post(`/tenant`, {
      name: newTenantName,
      email: newTenantAdminEmail,
      password: newTenantAdminPassword,
      storage_limit_file: newTenantFileLimit,
      storage_limit_database: newTenantDatabaseLimit
    }).then((res) => {
      TenantContextState.setTenants([res.data.tenant, ...TenantContextState.tenants]);
      handleClose();
    });
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={handleClose}>

            <Typography gutterBottom variant="h4" component="h5">
              Create new tenant.
            </Typography>

            <Grid container gap={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Tenant Name" variant="outlined" type="text" value={newTenantName} onChange={(e) => {
                  setNewTenantName(e.target.value);
                }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="File Limit" variant="outlined" type="number" InputProps={{
                  endAdornment: <InputAdornment position='end'>GB</InputAdornment>,
                }} value={newTenantFileLimit} onChange={(e) => {
                  setNewTenantFileLimit(Number(e.target.value));
                }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Database Limit" variant="outlined" type="number" InputProps={{
                  endAdornment: <InputAdornment position='end'>GB</InputAdornment>,
                }} value={newTenantDatabaseLimit} onChange={(e) => {
                  setNewTenantDatabaseLimit(Number(e.target.value));
                }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Admin Email" variant="outlined" type="email" value={newTenantAdminEmail} onChange={(e) => {
                  setNewTenantAdminEmail(e.target.value);
                }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Admin Password" variant="outlined" type="password" value={newTenantAdminPassword} onChange={(e) => {
                  setNewTenantAdminPassword(e.target.value);
                }} />
              </Grid>
              <Grid container item xs={12} gap={1}>
                <Button variant="contained" onClick={createNewTenant}>Create</Button>
                <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
            </Grid>
            
      </Modal>
    </>
  );
}

export default NewTenantModalComponent;
