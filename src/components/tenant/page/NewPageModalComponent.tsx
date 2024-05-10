import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
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

function NewPageModalComponent( {open, setOpen, pages, setPages}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [newPageName, setNewPageName] = useState("");

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setNewPageName("");
    setOpen(false);
  }

  const toggle = () => {
    open ? handleClose() : handleOpen();
  }

  const createNewPage = () => {
    http.post(`/page`, {
      name: newPageName,
    }).then((res) => {
      setPages([...pages, res.data.page]);

      const appPagesState = [...AppContextState.pages, res.data.page];
      AppContextState.setPages(appPagesState)
      localStorage.setItem("pages", JSON.stringify(appPagesState));

      handleClose();
    });
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={handleClose}>

            <Typography gutterBottom variant="h4" component="h5">
              Create new page.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Page Name" variant="outlined" type="text" value={newPageName} onChange={(e) => {
                  setNewPageName(e.target.value);
                }} />
              </Grid>
              <Grid container item xs={12} gap={1}>
                <Button variant="contained" onClick={createNewPage}>Create</Button>
                <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
            </Grid>

      </Modal>
    </>
  );
}

export default NewPageModalComponent;
