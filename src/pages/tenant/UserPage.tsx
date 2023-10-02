import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import numeral from 'numeral';

import {axios, http} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

import {UserTableComponent} from '../../components/tenant/user/UserTableComponent';
import NewUserModalComponent from '../../components/tenant/user/NewUserModalComponent';

function UserPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [users, setUsers] = useState<any>([]);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);

  useEffect(() => {
    http.get(`/user`).then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Button variant='contained' onClick={() => {
            setNewUserModalOpen(true);
          }}>New user</Button>
        </Grid>
        <Grid item xs={12}>
          <UserTableComponent users={users} setUsers={setUsers} />
        </Grid>
      </Grid>

      <NewUserModalComponent open={newUserModalOpen} setOpen={setNewUserModalOpen} users={users} setUsers={setUsers}/>
    </>
  );
}

export {UserPage};
