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

function UpdateUserModalComponent( {open, setOpen, users, setUsers, user}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [newUserName, setNewUserName] = useState("");
  const [newUserPublic, setNewUserPublic] = useState(false);
  const [newUserBlocked, setNewUserBlocked] = useState(false);

  useEffect(() => {
    setNewUserName(user.name);
    setNewUserPublic(user.public);
    setNewUserBlocked(user.blocked);
  }, [user]);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setNewUserName("");
    setNewUserPublic(false);
    setNewUserBlocked(false);

    setOpen(false);
  }

  const toggle = () => {
    open ? handleClose() : handleOpen();
  }

  const saveNewUser = () => {
    http.patch(`/user/${user.id}`, {
      name: newUserName,
      public: newUserPublic,
      blocked: newUserBlocked,
    }).then((res) => {
      setUsers(users.map((userRecord: any) => {
        if(userRecord.id === user.id){
          userRecord.name = newUserName;
          userRecord.public = newUserPublic;
          userRecord.blocked = newUserBlocked;
        }
        return userRecord;
      }));

      handleClose();
    });
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={handleClose}>

            <Typography gutterBottom variant="h4" component="h5">
              Update user.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="User Name" variant="outlined" type="text" value={newUserName} onChange={(e) => {
                  setNewUserName(e.target.value);
                }} />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Switch checked={newUserPublic} onChange={(e) => {
                  setNewUserPublic(e.target.checked);
                }} />} label="Public" />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Switch checked={newUserBlocked} onChange={(e) => {
                  setNewUserBlocked(e.target.checked);
                }} />} label="Blocked" />
              </Grid>
              <Grid container item xs={12} gap={1}>
                <Button variant="contained" onClick={saveNewUser}>Save</Button>
                <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
            </Grid>

      </Modal>
    </>
  );
}

export default UpdateUserModalComponent;
