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

function NewCollectionModalComponent( {open, setOpen, collections, setCollections}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionPublicRead, setNewCollectionPublicRead] = useState(false);
  const [newCollectionPublicCreate, setNewCollectionPublicCreate] = useState(false);
  const [newCollectionPublicUpdate, setNewCollectionPublicUpdate] = useState(false);
  const [newCollectionPublicDelete, setNewCollectionPublicDelete] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setNewCollectionName("");
    setNewCollectionPublicRead(false);
    setNewCollectionPublicCreate(false);
    setNewCollectionPublicUpdate(false);
    setNewCollectionPublicDelete(false);

    setOpen(false);
  }

  const toggle = () => {
    open ? handleClose() : handleOpen();
  }

  const createNewCollection = () => {
    http.post(`/collection`, {
      name: newCollectionName,
      public_create: newCollectionPublicCreate,
      public_read: newCollectionPublicRead,
      public_update: newCollectionPublicUpdate,
      public_delete: newCollectionPublicDelete
    }).then((res) => {
      setCollections([...collections, res.data.collection]);

      const appCollectionsState = [...AppContextState.collections, res.data.collection];
      AppContextState.setCollections(appCollectionsState)
      localStorage.setItem("collections", JSON.stringify(appCollectionsState));

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
              Create new tenant.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Tenant Name" variant="outlined" type="text" value={newCollectionName} onChange={(e) => {
                  setNewCollectionName(e.target.value);
                }} />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Switch checked={newCollectionPublicRead} onChange={(e) => {
                  setNewCollectionPublicRead(e.target.checked);
                }} />} label="Public Read" />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Switch checked={newCollectionPublicCreate} onChange={(e) => {
                  setNewCollectionPublicCreate(e.target.checked);
                }} />} label="Public Create" />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Switch checked={newCollectionPublicUpdate} onChange={(e) => {
                  setNewCollectionPublicUpdate(e.target.checked);
                }} />} label="Public Update" />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Switch checked={newCollectionPublicDelete} onChange={(e) => {
                  setNewCollectionPublicDelete(e.target.checked);
                }} />} label="Public Delete" />
              </Grid>
              <Grid container item xs={12} gap={1}>
                <Button variant="contained" onClick={createNewCollection}>Create</Button>
                <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

export default NewCollectionModalComponent;
