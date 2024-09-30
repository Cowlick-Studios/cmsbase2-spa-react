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

import EditMailerModalComponent from './EditMailerModalComponent';
import MailerCardComponent from './MailerCardComponent';

function MailersComponent( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [mailers, setMailers] = useState<any[]>([]);
  const [newMailerName, setNewMailerName] = useState<string>("");

  const [mailingLists, setMailingLists] = useState<any[]>([]);

  useEffect(() => {
    http.get(`/marketing_mailer`).then((res) => {
      setMailers(res.data.mailers);
      console.log(res.data.mailers);
    });

    http.get(`/marketing_list`).then((res) => {
      setMailingLists(res.data.lists);
    });
  }, []);

  const createMailer = () => {
    http.post(`/marketing_mailer`, {
      name: newMailerName,
      unlayer_data: null,
      html: null
    }).then((res) => {
      setMailers([...mailers, res.data.mailer]);
    });
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item container xs={12} spacing={1}>
          <Grid item container xs={10}>
            <TextField fullWidth id="outlined-basic" label="New Mailer Name" variant="outlined" type="text" value={newMailerName} size="small" onChange={(e) => {
                setNewMailerName(e.target.value);
              }} />
          </Grid>
          <Grid item container xs={2}>
            <Button fullWidth variant="contained" onClick={() => {
              createMailer();
            }}>Create</Button>
          </Grid>
        </Grid>

        <Grid item container xs={12} spacing={2}>

          {mailers.map((mailer) => (
            <Grid item container xs={3}>
              <MailerCardComponent mailingLists={mailingLists} mailers={mailers} setMailers={setMailers} mailer={mailer} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default MailersComponent;
