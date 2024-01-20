import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A, useParams } from 'react-router-dom';
import {http, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

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

function PagesDocumentPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  let {pageName} = useParams();

  const [page, setPage] = useState<any>({});
  const [pageFields, setPageFields] = useState<any>([]);
  const [newDocumentRequestObject, setNewDocumentRequestObject] = useState<any>({});

  useEffect(() => {
    http.get(`/page/${pageName}`).then((res) => {
      setPage(res.data.page);
      setPageFields(res.data.page.fields);
  
      const newDocumentRequestObjectTEMP: any = {};
      for(const field of res.data.page.fields){
        if(['tinyInteger', 'unsignedTinyInteger', 'smallInteger', 'unsignedSmallInteger', 'integer', 'unsignedInteger', 'mediumInteger', 'unsignedMediumInteger', 'bigInteger', 'unsignedBigInteger', 'decimal', 'unsignedDecimal', 'float', 'double'].includes(field.type.name)){
          newDocumentRequestObjectTEMP[field.name] = res.data.page.data[field.name];
        } else if(['char', 'string', 'tinyText', 'text', 'mediumText', 'longText'].includes(field.type.name)){
          newDocumentRequestObjectTEMP[field.name] = res.data.page.data[field.name];
        } else if(field.type.name.type === 'boolean'){
          newDocumentRequestObjectTEMP[field.name] = res.data.page.data[field.name];
        } else {
          newDocumentRequestObjectTEMP[field.name] = res.data.page.data[field.name];
        }
      }
      setNewDocumentRequestObject(newDocumentRequestObjectTEMP);
    });
  }, [pageName]);

  const updateRequestObj = (key: string, value: any) => {
    newDocumentRequestObject[key] = value;
    setNewDocumentRequestObject(newDocumentRequestObject);
  }

  const saveNewDocument = () => {
    http.patch(`/page/${page.id}`, {
      data: newDocumentRequestObject
    }).then((res) => {
      setPage(res.data.page);
      setPageFields(res.data.page.fields);
  
      const newDocumentRequestObjectTEMP: any = {};
      for(const field of res.data.page.fields){
        if(['tinyInteger', 'unsignedTinyInteger', 'smallInteger', 'unsignedSmallInteger', 'integer', 'unsignedInteger', 'mediumInteger', 'unsignedMediumInteger', 'bigInteger', 'unsignedBigInteger', 'decimal', 'unsignedDecimal', 'float', 'double'].includes(field.type.name)){
          newDocumentRequestObjectTEMP[field.name] = res.data.page.data[field.name];
        } else if(['char', 'string', 'tinyText', 'text', 'mediumText', 'longText'].includes(field.type.name)){
          newDocumentRequestObjectTEMP[field.name] = res.data.page.data[field.name];
        } else if(field.type.name.type === 'boolean'){
          newDocumentRequestObjectTEMP[field.name] = res.data.page.data[field.name];
        } else {
          newDocumentRequestObjectTEMP[field.name] = res.data.page.data[field.name];
        }
      }
      setNewDocumentRequestObject(newDocumentRequestObjectTEMP);
    });
  }

  return (
    <>
      <Card variant='outlined'>
        <CardContent>
          <Grid container spacing={2}>
            <Grid container item xs={12} gap={1} justifyContent='flex-end'>
              <Button variant="contained" onClick={saveNewDocument}>Save</Button>
            </Grid>

            {pageFields.map((field: any) => { // 1/4 = 3, 1/3 = 4, 1/2 = 6, 1 = 12
              if(['tinyInteger', 'unsignedTinyInteger', 'smallInteger', 'unsignedSmallInteger', 'integer', 'unsignedInteger', 'mediumInteger', 'unsignedMediumInteger', 'bigInteger', 'unsignedBigInteger', 'decimal', 'unsignedDecimal', 'float', 'double'].includes(field.type.name)){
                return (
                  <Grid item xs={12} key={`CollectionDocumentInputField-${field.name}`}>
                    <TextField fullWidth id="outlined" label={field.name} variant="outlined" type="number" defaultValue={newDocumentRequestObject[field.name]} onChange={(e) => {
                      updateRequestObj(field.name, e.target.value);
                    }} />
                  </Grid>
                );
              } else if(['char', 'string', 'tinyText'].includes(field.type.name)){
                return (
                  <Grid item xs={12} key={`CollectionDocumentInputField-${field.name}`}>
                    <TextField fullWidth id="outlined" label={field.name} variant="outlined" type="text" defaultValue={newDocumentRequestObject[field.name]} onChange={(e) => {
                      updateRequestObj(field.name, e.target.value);
                    }} />
                  </Grid>
                );
              } else if(['text', 'mediumText', 'longText'].includes(field.type.name)){
                return (
                  <Grid item xs={12} key={`CollectionDocumentInputField-${field.id}`}>
                    <TextField multiline rows={6} fullWidth id="outlined" label={field.name} variant="outlined" type="text" defaultValue={newDocumentRequestObject[field.name]} onChange={(e) => {
                      updateRequestObj(field.name, e.target.value);
                    }} />
                  </Grid>
                );
              } else if(['richText'].includes(field.type.name)){
                return (
                  <Grid item xs={12} key={`CollectionDocumentInputField-${field.name}`}>
                    <TextField multiline rows={6} fullWidth id="outlined" label={field.name} variant="outlined" type="text" defaultValue={newDocumentRequestObject[field.name]} onChange={(e) => {
                      updateRequestObj(field.name, e.target.value);
                    }} />
                  </Grid>
                );
              } else if(['boolean'].includes(field.type.name)){
                return (
                  <Grid item xs={12} key={`CollectionDocumentInputField-${field.name}`}>
                    <FormControlLabel control={<Switch defaultChecked={newDocumentRequestObject[field.name]} defaultValue={newDocumentRequestObject[field.name]} onChange={(e) => {
                      updateRequestObj(field.name, e.target.checked);
                    }} />} label={field.name} />
                  </Grid>
                );
              } else if(['date'].includes(field.type.name)){
                return (
                  <Grid item xs={12} key={`CollectionDocumentInputField-${field.name}`}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label={field.name} defaultValue={newDocumentRequestObject[field.name]} onChange={(e: any) => {
                        updateRequestObj(field.name, new Date(e.$d).toLocaleDateString());
                      }} sx={{
                        width: '100%'
                      }} />
                    </LocalizationProvider>
                  </Grid>
                );
              } else if(['time'].includes(field.type.name)){
                return (
                  <Grid item xs={12} key={`CollectionDocumentInputField-${field.name}`}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker label={field.name} defaultValue={newDocumentRequestObject[field.name]} onChange={(e: any) => {
                        updateRequestObj(field.name, new Date(e.$d).toLocaleTimeString());
                      }} sx={{
                        width: '100%'
                      }}/>
                    </LocalizationProvider>
                  </Grid>
                );
              } else if(['dateTime', 'timestamp'].includes(field.type.name)){
                return (
                  <Grid item xs={12} key={`CollectionDocumentInputField-${field.name}`}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker label={field.name} defaultValue={newDocumentRequestObject[field.name]} onChange={(e: any) => {
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
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export {PagesDocumentPage};
