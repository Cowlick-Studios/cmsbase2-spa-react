import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

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
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';

import { CollectionCardFieldsComponent } from './CollectionCardFieldsComponent';

function CollectionCardComponent( {collection, collections, setCollections}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [publicRead, setPublicRead] = useState(false);
  const [publicCreate, setPublicCreate] = useState(false);
  const [publicUpdate, setPublicUpdate] = useState(false);
  const [publicDelete, setPublicDelete] = useState(false);

  useEffect(() => {
    setPublicRead(collection.public_read);
    setPublicCreate(collection.public_create);
    setPublicUpdate(collection.public_update);
    setPublicDelete(collection.public_delete);
  }, [collection]);

  const updatePublicPermission = (operation: string, value: boolean) => {

    const requestObject = {
      public_read: publicRead,
      public_create: publicCreate,
      public_update: publicUpdate,
      public_delete: publicDelete
    }

    if(operation === "read"){
      setPublicRead(value);
      requestObject.public_read = value;
    } else if(operation === "create"){
      setPublicCreate(value);
      requestObject.public_create = value;
    } else if(operation === "update"){
      setPublicUpdate(value);
      requestObject.public_update = value;
    } else if(operation === "delete"){
      setPublicDelete(value);
      requestObject.public_delete = value;
    }

    http.patch(`/collection/${collection.id}`, requestObject).then((res) => {
      // console.log(res);
    });
  }

  const deleteCollection = (collection: any) => {
    http.delete(`/collection/${collection.id}`).then(() => {
      setCollections(collections.filter((collectionRecord: any) => {
        return collectionRecord.id !== collection.id;
      }))

      const appCollectionsState = AppContextState.collections.filter((collectionRecord: any) => {
        return collectionRecord.id !== collection.id;
      });
      AppContextState.setCollections(appCollectionsState);
      localStorage.setItem("collections", JSON.stringify(appCollectionsState));
    });
  } 

  return (
    <>
      <Card variant="outlined">

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom>
                {collection.name}
              </Typography>
            </Grid>
            <Grid container item xs={6} justifyContent="flex-end">
              <IconButton aria-label="delete" onClick={() => {
                deleteCollection(collection);
              }}>
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <FormControlLabel control={<Switch checked={publicRead} onChange={(e) => {
                      updatePublicPermission('read', e.target.checked);
                    }} />} label="Public Read" />
                  </Grid>

                  <Grid item xs={3}>
                    <FormControlLabel control={<Switch checked={publicCreate} onChange={(e) => {
                      updatePublicPermission('create', e.target.checked);
                    }} />} label="Public Create" />
                  </Grid>

                  <Grid item xs={3}>
                    <FormControlLabel control={<Switch checked={publicUpdate} onChange={(e) => {
                      updatePublicPermission('update', e.target.checked);
                    }} />} label="Public Update" />
                  </Grid>

                  <Grid item xs={3}>
                    <FormControlLabel control={<Switch checked={publicDelete} onChange={(e) => {
                      updatePublicPermission('delete', e.target.checked);
                    }} />} label="Public Delete" />
                  </Grid>
                </Grid>                
              </FormGroup>
            </Grid>
          </Grid>
        </CardContent>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CollectionCardFieldsComponent collection={collection}/>
          </Grid>
        </Grid>

      </Card>
    </>
  );
}

export {CollectionCardComponent};
