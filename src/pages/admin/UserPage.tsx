import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';

import {axios, http} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';
import { UserContext } from '../../contexts/admin/UserContext';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import UserTableComponent from '../../components/admin/user/UserTableComponent';
import NewTenantModalComponent from '../../components/admin/tenant/NewTenantModalComponent';
import NewUserModalComponent from '../../components/admin/user/NewUserModalComponent';

function UserPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [users, setUsers] = useState<any>([]);
  const [openNewUser, setOpenNewUser] = useState(false);

  useEffect(() => {
    http.get(`/user`).then((res) => {
      setUsers(res.data.users.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name);
      }));
    });
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          users,
          setUsers,
        }}
      >
        <Grid container gap={2}>
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => {
              setOpenNewUser(!openNewUser);
            }}>New User</Button>
          </Grid>
          <Grid item xs={12}>
          <UserTableComponent/>
          </Grid>
        </Grid>
        
        <NewUserModalComponent open={openNewUser} setOpen={setOpenNewUser}/>
      </UserContext.Provider>
    </>
  );
}

export default UserPage;
