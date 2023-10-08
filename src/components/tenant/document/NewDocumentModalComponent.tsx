import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Modal from '../../utility/Modal';

function NewDocumentModalComponent( {open, setOpen, collection, collectionFields, documents, setDocuments}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [newDocumentRequestObject, setNewDocumentRequestObject] = useState<any>({});
  const [sortedCollectionFields, setSortedCollectionFields] = useState<any>([]);

  useEffect(() => {

    setSortedCollectionFields(collectionFields.sort((a: any, b: any) => {
      if (['text', 'mediumText', 'longText', 'richText'].includes(a.name) && ['text', 'mediumText', 'longText', 'richText'].includes(b.name)) {
        return 1; // Put 'TargetName' at the bottom
      } else if (!['text', 'mediumText', 'longText', 'richText'].includes(a.name) && ['text', 'mediumText', 'longText', 'richText'].includes(b.name)) {
        return -1; // Put 'TargetName' at the bottom
      } else {
        return a.id - b.id;
      }
    }));

    for(const field of sortedCollectionFields){
      if(['tinyInteger', 'unsignedTinyInteger', 'smallInteger', 'unsignedSmallInteger', 'integer', 'unsignedInteger', 'mediumInteger', 'unsignedMediumInteger', 'bigInteger', 'unsignedBigInteger', 'decimal', 'unsignedDecimal', 'float', 'double'].includes(field.type.name)){
        newDocumentRequestObject[field.name] = 0;
      } else if(['char', 'string', 'tinyText', 'text', 'mediumText', 'longText'].includes(field.type.name)){
        newDocumentRequestObject[field.name] = "";
      } else if(field.type.name === 'boolean'){
        newDocumentRequestObject[field.name] = false;
      } else {
        newDocumentRequestObject[field.name] = null;
      }
    }

    setNewDocumentRequestObject(newDocumentRequestObject);
  }, [collection, collectionFields]);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setNewDocumentRequestObject({});
    setOpen(false);
  }

  const toggle = () => {
    open ? handleClose() : handleOpen();
  }

  const updateRequestObj = (key: string, value: any) => {
    newDocumentRequestObject[key] = value;
    setNewDocumentRequestObject(newDocumentRequestObject);
  }

  const saveNewDocument = () => {
    console.log(newDocumentRequestObject);

    http.post(`/collection/${collection.name}/document`, newDocumentRequestObject).then((res) => {
      setDocuments([res.data.document, ...documents]);
      handleClose();
    });

    for(const field of sortedCollectionFields){
      if(['tinyInteger', 'unsignedTinyInteger', 'smallInteger', 'unsignedSmallInteger', 'integer', 'unsignedInteger', 'mediumInteger', 'unsignedMediumInteger', 'bigInteger', 'unsignedBigInteger', 'decimal', 'unsignedDecimal', 'float', 'double'].includes(field.type.name)){
        newDocumentRequestObject[field.name] = 0;
      } else if(['char', 'string', 'tinyText', 'text', 'mediumText', 'longText'].includes(field.type.name)){
        newDocumentRequestObject[field.name] = "";
      } else if(field.type.name === 'boolean'){
        newDocumentRequestObject[field.name] = false;
      } else {
        newDocumentRequestObject[field.name] = null;
      }
    }

    setNewDocumentRequestObject(newDocumentRequestObject);
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Card variant='outlined'>
          <CardContent>
            <Grid container spacing={2}>
              {sortedCollectionFields.map((field: any) => { // 1/4 = 3, 1/3 = 4, 1/2 = 6, 1 = 12
                if(['tinyInteger', 'unsignedTinyInteger', 'smallInteger', 'unsignedSmallInteger', 'integer', 'unsignedInteger', 'mediumInteger', 'unsignedMediumInteger', 'bigInteger', 'unsignedBigInteger', 'decimal', 'unsignedDecimal', 'float', 'double'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <TextField fullWidth id="outlined" label={field.name} variant="outlined" type="number" onChange={(e) => {
                        updateRequestObj(field.name, e.target.value);
                      }} />
                    </Grid>
                  );
                } else if(['char', 'string', 'tinyText'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <TextField fullWidth id="outlined" label={field.name} variant="outlined" type="text" onChange={(e) => {
                        updateRequestObj(field.name, e.target.value);
                      }} />
                    </Grid>
                  );
                } else if(['text', 'mediumText', 'longText'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <TextField multiline rows={6} fullWidth id="outlined" label={field.name} variant="outlined" type="text" onChange={(e) => {
                        updateRequestObj(field.name, e.target.value);
                      }} />
                    </Grid>
                  );
                } else if(['richText'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <TextField multiline rows={6} fullWidth id="outlined" label={field.name} variant="outlined" type="text" onChange={(e) => {
                        updateRequestObj(field.name, e.target.value);
                      }} />
                    </Grid>
                  );
                } else if(['boolean'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <FormControlLabel control={<Switch defaultChecked={newDocumentRequestObject[field.name]} onChange={(e) => {
                        updateRequestObj(field.name, e.target.checked);
                      }} />} label={field.name} />
                    </Grid>
                  );
                } else if(['date'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label={field.name} onChange={(e: any) => {
                          updateRequestObj(field.name, new Date(e.$d).toLocaleDateString());
                        }} sx={{
                          width: '100%'
                        }} />
                      </LocalizationProvider>
                    </Grid>
                  );
                } else if(['time'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker label={field.name} onChange={(e: any) => {
                          updateRequestObj(field.name, new Date(e.$d).toLocaleTimeString());
                        }} sx={{
                          width: '100%'
                        }}/>
                      </LocalizationProvider>
                    </Grid>
                  );
                } else if(['dateTime', 'timestamp'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker label={field.name} onChange={(e: any) => {
                          updateRequestObj(field.name, new Date(e.$d).toLocaleString());
                        }} sx={{
                          width: '100%'
                        }} />
                      </LocalizationProvider>
                    </Grid>
                  );
                }

                return <></>;
              })}

              <Grid container item xs={12} gap={1} justifyContent='center'>
                <Button variant="contained" onClick={saveNewDocument}>Save</Button>
                <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

export {NewDocumentModalComponent};
