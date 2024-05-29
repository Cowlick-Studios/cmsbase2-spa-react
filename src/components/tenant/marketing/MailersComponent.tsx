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

function MailersComponent( {open, setOpen, emailSubmissions, setEmailSubmissions}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [mailers, setMailers] = useState<any[]>([]);
  const [newMailerName, setNewMailerName] = useState<string>("");
  const [selectedMailer, setSelectedMailer] = useState<any>({});
  const [openMailerEditor, setOpenMailerEditor] = useState<boolean>(false);

  useEffect(() => {
    http.get(`/marketing_mailer`).then((res) => {
      setMailers(res.data.mailers);
      console.log(res.data.mailers);
    });
  }, []);

  const createMailer = () => {
    http.post(`/marketing_mailer`, {
      name: newMailerName,
      unlayer_data: null,
      html: null
    }).then((res) => {
      setMailers([...mailers]);
      console.log(res.data);
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
                  <Button fullWidth variant="contained" onClick={() => {
                    setSelectedMailer(mailer);
                    setOpenMailerEditor(true);
                  }}>Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <EditMailerModalComponent open={openMailerEditor} setOpen={setOpenMailerEditor} mailers={mailers} setMailers={setMailers} mailer={selectedMailer}/>
    </>
  );
}

export default MailersComponent;
