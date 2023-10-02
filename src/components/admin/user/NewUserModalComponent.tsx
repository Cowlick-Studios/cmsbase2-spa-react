import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';
import { UserContext } from '../../../contexts/admin/UserContext';

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

function NewUserModalComponent( {open, setOpen}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const UserContextState: any = useContext(UserContext);

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");

    setOpen(false);
  }

  const toggle = () => {
    open ? handleClose() : handleOpen();
  }

  const createNewUser = () => {
    http.post(`/user`, {
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword
    }).then((res) => {
      UserContextState.setUsers([res.data.user, ...UserContextState.users]);
      handleClose();
    });
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Card sx={{
          padding: '10px'
        }}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h5">
              Create new user.
            </Typography>

            <Grid container gap={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="User Name" variant="outlined" type="text" value={newUserName} onChange={(e) => {
                  setNewUserName(e.target.value);
                }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="User Email" variant="outlined" type="email" value={newUserEmail} onChange={(e) => {
                  setNewUserEmail(e.target.value);
                }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="User Password" variant="outlined" type="password" value={newUserPassword} onChange={(e) => {
                  setNewUserPassword(e.target.value);
                }} />
              </Grid>
              <Grid container item xs={12} gap={1}>
                <Button variant="contained" onClick={createNewUser}>Create</Button>
                <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

export default NewUserModalComponent;
