import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

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
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';

import NewItemModalComponent from '../../components/tenant/item/NewItemModalComponent';
import { UpdateItemComponent } from '../../components/tenant/item/UpdateItemComponent';

function ItemPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [items, setItems] = useState<any>([]);
  const [openNewItemModal, setOpenNewItemModal] = useState(false);
  const [selectedUpdateItem, setSelectedUpdateItem] = useState<any>({});
  const [openUpdateItemModal, setUpdateNewItemModal] = useState(false);

  useEffect(() => {
    http.get(`/item`).then((res) => {
      setItems(res.data.items);
    });
  }, []);

  const deleteItem = (item: any) => {
    http.delete(`/item/${item.id}`).then((res) => {
      setItems(items.filter((itemRecord: any) => {
        return itemRecord.id !== item.id;
      }));
    });
  }

  const editItem = (item: any) => {
    setSelectedUpdateItem(item);
    setUpdateNewItemModal(true);
  }

  return (
    <>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Button variant="contained" onClick={() => {
            setOpenNewItemModal(true);
          }}>New Item</Button>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <Table sx={{
              width: '100%'
            }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item: any) => (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type.name}</TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="delete" size="small" onClick={() => {
                        editItem(item);
                      }}>
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="delete" size="small" onClick={() => {
                        deleteItem(item);
                      }}>
                        <VisibilityIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="delete" size="small" onClick={() => {
                        deleteItem(item);
                      }}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>

      </Grid>

      <NewItemModalComponent items={items} setItems={setItems} open={openNewItemModal} setOpen={setOpenNewItemModal}/>
      <UpdateItemComponent open={openUpdateItemModal} setOpen={setUpdateNewItemModal} items={items} setItems={setItems} item={selectedUpdateItem}/>
    </>
  );
}

export {ItemPage};
