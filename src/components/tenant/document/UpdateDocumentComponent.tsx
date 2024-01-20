import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';
import dayjs from 'dayjs';

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

function UpdateDocumentComponent( {open, setOpen, collection, collectionFields, documents, setDocuments, document}: any ) {
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

    const newDocumentRequestObjectTEMP: any = {};

    for(const field of sortedCollectionFields){
      if(['tinyInteger', 'unsignedTinyInteger', 'smallInteger', 'unsignedSmallInteger', 'integer', 'unsignedInteger', 'mediumInteger', 'unsignedMediumInteger', 'bigInteger', 'unsignedBigInteger', 'decimal', 'unsignedDecimal', 'float', 'double'].includes(field.type.name)){
        newDocumentRequestObjectTEMP[field.name] = Number(document[field.name]);
      } else if(['char', 'string', 'tinyText', 'text', 'mediumText', 'longText'].includes(field.type.name)){
        newDocumentRequestObjectTEMP[field.name] = String(document[field.name]);
      } else if(field.type.name === 'boolean'){
        newDocumentRequestObjectTEMP[field.name] = Boolean(document[field.name]);
      } else {
        newDocumentRequestObjectTEMP[field.name] = document[field.name];
      }
    }

    setNewDocumentRequestObject(newDocumentRequestObjectTEMP);
  }, [collection, collectionFields, open]);

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
    http.patch(`/collection/${collection.name}/document/${document.id}`, newDocumentRequestObject).then((res) => {
      setDocuments(documents.map((documentRecord: any) => {
        if(documentRecord.id === res.data.document.id){
          return res.data.document;
        }
        return documentRecord;
      }));

      handleClose();
    });

    for(const field of sortedCollectionFields){
      if(['tinyInteger', 'unsignedTinyInteger', 'smallInteger', 'unsignedSmallInteger', 'integer', 'unsignedInteger', 'mediumInteger', 'unsignedMediumInteger', 'bigInteger', 'unsignedBigInteger', 'decimal', 'unsignedDecimal', 'float', 'double'].includes(field.type.name)){
        newDocumentRequestObject[field.name] = Number(document[field.name]);
      } else if(['char', 'string', 'tinyText', 'text', 'mediumText', 'longText'].includes(field.type.name)){
        newDocumentRequestObject[field.name] = String(document[field.name]);
      } else if(field.type.name === 'boolean'){
        newDocumentRequestObject[field.name] = Boolean(document[field.name]);
      } else {
        newDocumentRequestObject[field.name] = document[field.name];
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
                      <TextField fullWidth id="outlined" label={field.name} variant="outlined" type="number" defaultValue={document[field.name]} onChange={(e) => {
                        updateRequestObj(field.name, e.target.value);
                      }} />
                    </Grid>
                  );
                } else if(['char', 'string', 'tinyText'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <TextField fullWidth id="outlined" label={field.name} variant="outlined" type="text" defaultValue={document[field.name]} onChange={(e) => {
                        updateRequestObj(field.name, e.target.value);
                      }} />
                    </Grid>
                  );
                } else if(['text', 'mediumText', 'longText'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <TextField multiline rows={6} fullWidth id="outlined" label={field.name} variant="outlined" type="text" defaultValue={document[field.name]} onChange={(e) => {
                        updateRequestObj(field.name, e.target.value);
                      }} />
                    </Grid>
                  );
                } else if(['richText'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <TextField multiline rows={6} fullWidth id="outlined" label={field.name} variant="outlined" type="text" defaultValue={document[field.name]} onChange={(e) => {
                        updateRequestObj(field.name, e.target.value);
                      }} />
                    </Grid>
                  );
                } else if(['boolean'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <FormControlLabel control={<Switch defaultChecked={document[field.name]} onChange={(e) => {
                        updateRequestObj(field.name, e.target.checked);
                      }} />} label={field.name} />
                    </Grid>
                  );
                } else if(['date'].includes(field.type.name)){
                  return (
                    <Grid item xs={6} key={`CollectionDocumentInputField-${field.id}`}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label={field.name} defaultValue={dayjs(document[field.name])} onChange={(e: any) => {
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
                        <TimePicker label={field.name} defaultValue={dayjs().set('hour', document[field.name]?.split(':')[0]).set('minute', document[field.name]?.split(':')[1]).set('second', document[field.name]?.split(':')[2]).startOf('day')} onChange={(e: any) => {
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
                        <DateTimePicker label={field.name} defaultValue={dayjs(document[field.name])} onChange={(e: any) => {
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

export {UpdateDocumentComponent};
