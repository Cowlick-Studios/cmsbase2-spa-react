import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';
import { UserContext } from '../../../contexts/UserContext';
import looseStringCompare from '../../../utility/loseStringCompare';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function UserTableComponent( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const UserContextState: any = useContext(UserContext);

  const [searchedUsers, setSearchedUsers] = useState<any>([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    setSearchedUsers(UserContextState.users);
  }, [UserContextState.users])

  const deleteUser = (user: any) => {
    http.delete(`/user/${user.id}`).then((res) => {
      UserContextState.setUsers(UserContextState.users.filter((userRecord: any) => {
        return userRecord.id !== user.id;
      }))
    });
  }

  const searchUsers = (searchString: string) => {
    setSearchString(searchString);
    setSearchedUsers(UserContextState.users.filter((user: any) => {
      return looseStringCompare(searchString, [user.name, user.email]);
    }));
  }

  return (
    <>
      <TextField size="small" fullWidth label="Search Users" variant="outlined" type="text" value={searchString} onChange={(e) => {
        searchUsers(e.target.value);
      }}/>
      <Card variant="outlined">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchedUsers.map((user: any) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.email_verified_at ? (
                  <Chip size="small" label="Verified" color="success" />
                ) : (
                  <Chip size="small" label="Unverified" color="error" />
                )}</TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" onClick={() => {
                    deleteUser(user);
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export default UserTableComponent;
