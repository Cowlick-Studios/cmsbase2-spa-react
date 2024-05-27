import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Modal from '../../utility/Modal';

function NewItemModalComponent( {open, setOpen, items, setItems}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [newItemTypeId, setNewItemTypeId] = useState(1);
  const [newItemName, setNewItemName] = useState("");
  // const [newItemValue, setNewItemValue] = useState("");

  useEffect(() => {
    setNewItemTypeId(AppContextState.fieldTypes[16-1].id);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setNewItemName("");
    // setNewItemValue("");
    setNewItemTypeId(AppContextState.fieldTypes[16-1].id);
    setOpen(false);
  }

  const toggle = () => {
    open ? handleClose() : handleOpen();
  }

  const createNewItem = () => {
    http.post(`/item`, {
      name: newItemName,
      type_id: newItemTypeId,
    }).then((res) => {
      console.log(res);
      setItems([res.data.item, ...items]);
      handleClose();
    });
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={handleClose}>

            <Typography gutterBottom variant="h4" component="h5">
              Create new item.
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={6}>
                <TextField fullWidth label="Item Name" variant="outlined" type="text" value={newItemName} onChange={(e) => {
                  setNewItemName(e.target.value);
                }} />
              </Grid>

              <Grid item xs={6}>
                <Select
                  fullWidth
                  value={newItemTypeId}
                  label="Item Type"
                  onChange={(e) => {
                    setNewItemTypeId(Number(e.target.value));
                  }}
                >
                  {AppContextState.fieldTypes.map((fieldType: any) => (
                    <MenuItem key={`ItemFieldType-${fieldType.id}`} value={fieldType.id}>{fieldType.name}</MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* <Grid item xs={12}>
                <TextField fullWidth label="Item Value" variant="outlined" type="text" value={newItemValue} onChange={(e) => {
                  setNewItemValue(e.target.value);
                }} />
              </Grid> */}

              <Grid container item xs={12} gap={1}>
                <Button variant="contained" onClick={createNewItem}>Create</Button>
                <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
              </Grid>

            </Grid>

      </Modal>
    </>
  );
}

export default NewItemModalComponent;
