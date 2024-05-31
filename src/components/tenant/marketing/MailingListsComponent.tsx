import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import { Card, Grid, Chip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditListModalComponent from './EditListModalComponent';


function MailingListsComponent( {open, setOpen, emailSubmissions, setEmailSubmissions}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [mailingLists, setMailingLists] = useState<any[]>([]);
  const [newMailingListName, setNewMailingListName] = useState<string>("");

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<any>({});

  useEffect(() => {
    http.get(`/marketing_list`).then((res) => {
      setMailingLists(res.data.lists);
    });
  }, []);

  const createNewMailingList = () => {
    http.post(`/marketing_list`, {
      name: newMailingListName
    }).then((res) => {
      setMailingLists([res.data.list, ...mailingLists]);
      setNewMailingListName('');
    });
  }

  const removeMailingList = (list: any) => {
    http.delete(`/marketing_list/${list.id}`).then((res) => {
      setMailingLists(mailingLists.filter((listItem: any) => {
        return listItem.id !== list.id;
      }));
    });
  }

  return (
    <>
      <Grid container spacing={1}>

        <Grid item container xs={12} spacing={1}>
          <Grid item container xs={10}>
            <TextField fullWidth id="outlined-basic" label="New List Name" variant="outlined" type="text" value={newMailingListName} size="small" onChange={(e) => {
                setNewMailingListName(e.target.value);
              }} />
          </Grid>
          <Grid item container xs={2}>
            <Button fullWidth variant="contained" onClick={() => {
              createNewMailingList();
            }}>Create</Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card variant='outlined' sx={{ width: '100%' }}>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Subscribers</TableCell>
                  <TableCell>reCAPTCHA</TableCell>
                  <TableCell>Turnstile</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mailingLists.map((list: any) => (
                  <TableRow
                    key={`MarketingListTable-${list.id}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{list.id}</TableCell>
                    <TableCell>{list.name}</TableCell>
                    <TableCell>{list.description}</TableCell>
                    <TableCell>{list.subscribers_count}</TableCell>
                    <TableCell>{list.recaptcha ? <Chip label="enabled" size="small" color="success" /> : <Chip label="disabled" size="small" color="error" />}</TableCell>
                    <TableCell>{list.turnstile ? <Chip label="enabled" size="small" color="success" /> : <Chip label="disabled" size="small" color="error" />}</TableCell>

                    <TableCell align="right">

                      <IconButton aria-label="edit" size="small" onClick={() => {
                        setSelectedList(list);
                        setOpenEdit(true);
                      }}>
                        <EditIcon fontSize="inherit" />
                      </IconButton>

                      <IconButton aria-label="delete" size="small" onClick={() => {
                        removeMailingList(list);
                      }}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>

      <EditListModalComponent open={openEdit} setOpen={setOpenEdit} lists={mailingLists} setLists={setMailingLists} listId={selectedList.id}/>
    </>
  );
}

export default MailingListsComponent;
