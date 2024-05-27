import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Editor from '../../../components/utility/Editor';
import FileSelect from '../../utility/FileSelect';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Modal from '../../utility/Modal';

function UpdateItemComponent( {open, setOpen, items, setItems, item}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [newItemValue, setNewItemValue] = useState<any>("");

  useEffect(() => {

    console.log(item);

    if(['tinyInteger', 'unsignedTinyInteger', 'smallInteger', 'unsignedSmallInteger', 'integer', 'unsignedInteger', 'mediumInteger', 'unsignedMediumInteger', 'bigInteger', 'unsignedBigInteger', 'decimal', 'unsignedDecimal', 'float', 'double'].includes(item?.type?.name)){
      setNewItemValue(Number(item.value));
    } else if(['char', 'string', 'tinyText', 'text', 'mediumText', 'longText'].includes(item?.type?.name)){
      setNewItemValue(String(item.value));
    } else if(item?.type?.name === 'boolean'){
      setNewItemValue(Boolean(item.value));
    } else {
      setNewItemValue(item.value);
    }

  }, [open, item]);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setNewItemValue("");
    setOpen(false);
  }

  const toggle = () => {
    open ? handleClose() : handleOpen();
  }

  const saveNewItem = () => {
    http.patch(`/item/${item.id}`, {
      value: newItemValue
    }).then((res) => {
      setItems(items.map((itemRecord: any) => {
        if(itemRecord.id === res.data.item.id){
          return res.data.item;
        }
        return itemRecord;
      }));
      handleClose();
    });
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={handleClose}>

            <Grid container spacing={2}>

              {['tinyInteger', 'unsignedTinyInteger', 'smallInteger', 'unsignedSmallInteger', 'integer', 'unsignedInteger', 'mediumInteger', 'unsignedMediumInteger', 'bigInteger', 'unsignedBigInteger', 'decimal', 'unsignedDecimal', 'float', 'double'].includes(item?.type?.name) && (
                <Grid item xs={12} key={`InputField-${item.id}`}>
                  <TextField fullWidth id="outlined" label={item.name} variant="outlined" type="number" value={newItemValue} onChange={(e) => {
                    setNewItemValue(e.target.value);
                  }} />
                </Grid>
              )}

              {['char', 'string', 'tinyText'].includes(item?.type?.name) && (
                <Grid item xs={12} key={`InputField-${item.id}`}>
                  <TextField fullWidth id="outlined" label={item.name} variant="outlined" type="text" value={newItemValue} onChange={(e) => {
                    setNewItemValue(e.target.value);
                  }} />
                </Grid>
              )}

              {['text', 'mediumText', 'longText'].includes(item?.type?.name) && (
                <Grid item xs={12} key={`InputField-${item.id}`}>
                  <TextField multiline rows={6} fullWidth id="outlined" label={item.name} variant="outlined" type="text" value={newItemValue} onChange={(e) => {
                    setNewItemValue(e.target.value);
                  }} />
                </Grid>
              )}

              {['richText'].includes(item?.type?.name) && (
                <Grid item xs={12} key={`InputField-${item.id}`}>
                  {/* <TextField multiline rows={6} fullWidth id="outlined" label={item.name} variant="outlined" type="text" value={newItemValue} onChange={(e) => {
                    setNewItemValue(e.target.value);
                  }} /> */}
                  <Editor label={item.name} data={newItemValue} onChange={(data: string) => {
                    setNewItemValue(data);
                  }} />
                </Grid>
              )}

              {['boolean'].includes(item?.type?.name) && (
                <Grid item xs={12} key={`InputField-${item.id}`}>
                  <FormControlLabel control={<Switch checked={newItemValue} onChange={(e) => {
                    setNewItemValue(e.target.value);
                  }} />} label={item.name} />
                </Grid>
              )}

              {['date'].includes(item?.type?.name) && (
                <Grid item xs={12} key={`InputField-${item.id}`}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={item.name} value={dayjs(newItemValue)} onChange={(e: any) => {
                      setNewItemValue(e);
                    }} sx={{
                      width: '100%'
                    }} />
                  </LocalizationProvider>
                </Grid>
              )}

              {['time'].includes(item?.type?.name) && (
                <Grid item xs={12} key={`InputField-${item.id}`}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label={item.name} value={dayjs().set('hour', newItemValue?.split(':')[0]).set('minute', newItemValue?.split(':')[1]).set('second', newItemValue?.split(':')[2]).startOf('day')} onChange={(e: any) => {
                      setNewItemValue(e);
                    }} sx={{
                      width: '100%'
                    }}/>
                  </LocalizationProvider>
                </Grid>
              )}

              {['dateTime', 'timestamp'].includes(item?.type?.name) && (
                <Grid item xs={12} key={`InputField-${item.id}`}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label={item.name} value={dayjs(newItemValue)} onChange={(e: any) => {
                      setNewItemValue(e);
                    }} sx={{
                      width: '100%'
                    }} />
                  </LocalizationProvider>
                </Grid>
              )}

              {['file'].includes(item?.type?.name) && (
                <Grid item xs={12} key={`InputField-${item.id}`}>
                  <FileSelect preselectFileId={newItemValue} onChange={(file: any) => {
                    setNewItemValue(file.id);
                  }}/>
                </Grid>
              )}

              <Grid container item xs={12} gap={1} justifyContent='center'>
                <Button variant="contained" onClick={saveNewItem}>Save</Button>
                <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
              </Grid>
            </Grid>

      </Modal>
    </>
  );
}

export {UpdateItemComponent};
