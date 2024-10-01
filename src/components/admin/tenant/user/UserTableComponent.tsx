import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../../services/http';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import UpdateUserModalComponent from './UpdateUserModalComponent';
import { CardContent } from '@mui/material';

function UserTableComponent( {users, setUsers, tenant}: any ) {
  const navigate = useNavigate();
  const http = useAxios();

  const [openUserUpdateModal, setOpenUserUpdateModal] = useState(false);
  const [selectedUpdateUser, setSelectedUpdateUser] = useState<any>({});

  const togglePublic = (user: any) => {
    http.patch(`/tenant/${tenant.id}/user/${user.id}`, {
      public: !user.public
    }).then((res) => {
      setUsers(users.map((userInstance: any) => {
        if(userInstance.id === user.id){
          userInstance.public = !user.public;
        }
        return userInstance;
      }));
    });
  }

  const toggleBlocked = (user: any) => {
    http.patch(`/tenant/${tenant.id}/user/${user.id}`, {
      blocked: !user.blocked
    }).then((res) => {
      setUsers(users.map((userInstance: any) => {
        if(userInstance.id === user.id){
          userInstance.blocked = !user.blocked;
        }
        return userInstance;
      }));
    });
  }

  const deleteUser = (user: any) => {
    http.delete(`/tenant/${tenant.id}/user/${user.id}`).then((res) => {
      setUsers(users.filter((userInstance: any) => {
        return userInstance.id !== user.id;
      }));
    });
  }

  const editUser = (user: any) => {
    setSelectedUpdateUser(user);
    setOpenUserUpdateModal(true);
  }

  return (
    <>
      <Card variant='outlined'>
        {/* <CardContent> */}
          <Table sx={{ minWidth: '100%' }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Public</TableCell>
                <TableCell>Blocked</TableCell>
                <TableCell>Verified</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: any) => (
                <TableRow
                  key={`UserListTable-${user.id}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{user.id}</TableCell>

                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>

                  <TableCell className='hoverClick' onClick={() => {
                    togglePublic(user);
                  }}>{user.public ? <Chip size="small" label="Public" color="success" /> : <Chip size="small" label="Private" color="primary" />}</TableCell>

                  <TableCell className='hoverClick' onClick={() => {
                    toggleBlocked(user);
                  }}>{user.blocked  ? <Chip size="small" label="Blocked" color="error" /> : <Chip size="small" label="Active" color="success" />}</TableCell>
                  
                  <TableCell>{user.email_verified_at  ? <Chip size="small" label="Verified" color="success" /> : <Chip size="small" label="Unverified" color="warning" />}</TableCell>

                  <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                  <TableCell>{new Date(user.updated_at).toLocaleString()}</TableCell>
                  <TableCell align="right">

                    <IconButton aria-label="edit" size="small" onClick={() => {
                      editUser(user);
                    }}>
                      <EditIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton aria-label="delete" size="small" onClick={() => {
                      deleteUser(user);
                    }}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        {/* </CardContent> */}
      </Card>

      <UpdateUserModalComponent open={openUserUpdateModal} setOpen={setOpenUserUpdateModal} users={users} setUsers={setUsers} user={selectedUpdateUser} tenant={tenant} />
    </>
  );
}

export {UserTableComponent};
