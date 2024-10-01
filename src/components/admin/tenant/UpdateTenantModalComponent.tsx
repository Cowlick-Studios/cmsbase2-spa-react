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

import { UserTableComponent } from './user/UserTableComponent';
import NewUserModalComponent from './user/NewUserModalComponent';

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

  const [tenantUsers, setTenantUsers] = useState<any[]>([]);
  const [openNewUser, setOpenNewUser] = useState(false);

  useEffect(() => {
    if(tenant.hasOwnProperty("id")){
      setNewTenantFileLimit(tenant.storage_limit_file);
      setNewTenantDatabaseLimit(tenant.storage_limit_database);

      http.get(`/tenant/${tenant.id}`).then((res) => {
        setTenantUsers(res.data.users);
      });
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

              <Grid container item xs={12} gap={1}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container gap={2}>
                      <Grid item xs={12}>
                        <Button variant="contained" onClick={() => setOpenNewUser(true)}>New Tenant user</Button>
                      </Grid>
                      <Grid item xs={12}>
                        <UserTableComponent users={tenantUsers} setUsers={setTenantUsers} tenant={tenant}/>
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

      <NewUserModalComponent open={openNewUser} setOpen={setOpenNewUser} users={tenantUsers} setUsers={setTenantUsers} tenant={tenant}/>
    </>
  );
}

export default UpdateTenantModalComponent;
