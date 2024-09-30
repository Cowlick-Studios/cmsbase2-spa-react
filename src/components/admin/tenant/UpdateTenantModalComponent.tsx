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
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';

import Modal from '../../utility/Modal';

function UpdateTenantModalComponent( {open, setOpen, tenant}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const TenantContextState: any = useContext(TenantContext);
  const http = useAxios();

  const [newTenantFileLimit, setNewTenantFileLimit] = useState(0);
  const [newTenantDatabaseLimit, setNewTenantDatabaseLimit] = useState(0);

  const [newTenantUserName, setNewTenantUserName] = useState("");
  const [newTenantUserEmail, setNewTenantUserEmail] = useState("");
  const [newTenantUserPassword, setNewTenantUserPassword] = useState("");
  const [newTenantUserAdmin, setNewTenantUserAdmin] = useState(false);

  useEffect(() => {
    if(tenant.hasOwnProperty("id")){
      setNewTenantFileLimit(tenant.storage_limit_file);
      setNewTenantDatabaseLimit(tenant.storage_limit_database);
    }
  }, [tenant]);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const toggle = () => {
    open ? handleClose() : handleOpen();
  }

  const updatedTenant = () => {
    http.patch(`/tenant/${tenant.id}`, {
      storage_limit_file: newTenantFileLimit,
      storage_limit_database: newTenantDatabaseLimit
    }).then((res) => {
      TenantContextState.setTenants(TenantContextState.tenants.map((tenantRecord: any) => {
        if(res.data.tenant.id === tenantRecord.id){
          tenantRecord.storage_limit_database = res.data.tenant.storage_limit_database;
          tenantRecord.storage_limit_file = res.data.tenant.storage_limit_file;
        }
        return tenantRecord;
      }));

      handleClose();
    });
  }

  const createNewTenantUser = () => {
    http.post(`/tenant/${tenant.id}/user`, {
      name: newTenantUserName,
      email: newTenantUserEmail,
      password: newTenantUserPassword,
      admin: newTenantUserAdmin
    }).then((res) => {
      handleClose();
    });
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={handleClose}>

            <Typography gutterBottom variant="h4" component="h5">
              Update tenant.
            </Typography>

            <Grid container gap={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="File Limit" variant="outlined" type="number" value={newTenantFileLimit} InputProps={{
                  endAdornment: <InputAdornment position='end'>GB</InputAdornment>,
                }} onChange={(e) => {
                  setNewTenantFileLimit(Number(e.target.value));
                }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Database Limit" variant="outlined" type="number" value={newTenantDatabaseLimit} InputProps={{
                  endAdornment: <InputAdornment position='end'>GB</InputAdornment>,
                }} onChange={(e) => {
                  setNewTenantDatabaseLimit(Number(e.target.value));
                }} />
              </Grid>

              {/* User Creation */}
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container gap={2}>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Name" variant="outlined" value={newTenantUserName} onChange={(e) => {
                          setNewTenantUserName(e.target.value);
                        }} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Email" variant="outlined" type="email" value={newTenantUserEmail} onChange={(e) => {
                          setNewTenantUserEmail(e.target.value);
                        }} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Password" variant="outlined" type="password" value={newTenantUserPassword} onChange={(e) => {
                          setNewTenantUserPassword(e.target.value);
                        }} />
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel control={<Switch checked={newTenantUserAdmin} onChange={(e) => {
                            setNewTenantUserAdmin(e.target.checked);
                          }} />} label="Is Admin" />
                        </FormGroup>
                      </Grid>
                      <Grid container item xs={12} gap={1}>
                        <Button variant="contained" onClick={createNewTenantUser}>Create User</Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid container item xs={12} gap={1}>
                <Button variant="contained" onClick={updatedTenant}>Save</Button>
                <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
            </Grid>

      </Modal>
    </>
  );
}

export default UpdateTenantModalComponent;
