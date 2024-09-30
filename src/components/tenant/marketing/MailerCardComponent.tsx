import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';
import { Parser } from 'html-to-react'

import { Card, Grid, Chip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import EditMailerModalComponent from './EditMailerModalComponent';

function MailerCardComponent( {mailingLists, mailer, mailers, setMailers}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [openMailerEditor, setOpenMailerEditor] = useState<boolean>(false);
  const [selectedMailingList, setSelectedMailingList] = useState<any>({});

  useEffect(() => {
    if(mailingLists.length > 0){
      setSelectedMailingList(mailingLists[0]);
    }
  }, [mailingLists]);

  const sendToMailingList = () => {
    http.post(`/marketing_mailer/${mailer.id}/list/${selectedMailingList.id}/send`).then((res) => {
      console.log("Sent to list!");
    });
  }

  const deleteMailer = () => {
    http.delete(`/marketing_mailer/${mailer.id}`).then((res) => {
      setMailers(mailers.filter((mailerItem: any) => {
        return mailerItem.id != mailer.id;
      }));
    });
  }

  return (
    <>
      <Card variant='outlined' sx={{width: '100%'}}>
        <CardContent>
          <Typography variant="h5" component="div">
            {mailer.name}
          </Typography>
          <Card sx={{
            scale: 0.3,
            maxHeight: '300px'
          }}>
            <CardContent>
              {Parser().parse(mailer.html)}
            </CardContent>
          </Card>
        </CardContent>
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Button fullWidth variant="contained" onClick={() => {
                setOpenMailerEditor(true);
              }}>Edit</Button>
            </Grid>
            <Grid item xs={4}>
              <Button fullWidth variant="contained" color='error' onClick={() => {
                deleteMailer();
              }}>delete</Button>
            </Grid>
            <Grid item xs={9}>
              <Select
                size='small'
                fullWidth
                value={selectedMailingList}
                label="Mailing List"
                onChange={(event: any) => {
                  setSelectedMailingList(event.target.value);
                }}
                renderValue={(selected: any) => {
                  return (
                    <p>{selected.name}</p>
                  );
                }}
              >
                {mailingLists.map((mailingListItem: any) => (
                  <MenuItem id={`mailer-${mailer.id}-item-${mailingListItem.id}`} value={mailingListItem}>{mailingListItem.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={() => {
                sendToMailingList();
              }}>Send</Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>

      <EditMailerModalComponent open={openMailerEditor} setOpen={setOpenMailerEditor} mailers={mailers} setMailers={setMailers} mailer={mailer}/>
    </>
  );
}

export default MailerCardComponent;
