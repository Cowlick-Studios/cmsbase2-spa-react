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

function PageCardFieldsComponent( {page}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [pageFields, setPageFields] = useState<any>([]);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldTypeId, setNewFieldTypeId] = useState(1);

  useEffect(() => {
    setPageFields(page.fields);
    setNewFieldTypeId(AppContextState.collectionFieldTypes[18-1].id);
  }, [page]);

  const deleteField = (field: any) => {
    http.delete(`/page/${page.id}/field/${field.id}`).then((res) => {
      setPageFields(pageFields.filter((fieldRecord: any) => {
        return fieldRecord.id !== field.id;
      }));
    });
  }

  const saveNewField = () => {
    http.post(`/page/${page.id}/field`, {
      name: newFieldName,
      type_id: newFieldTypeId
    }).then((res) => {
      setPageFields([...pageFields, res.data.field]);

      setNewFieldName("");
      setNewFieldTypeId(AppContextState.collectionFieldTypes[18-1].id);
    });
  }

  return (
    <>
      <Card>
        <Grid container spacing={2} sx={{
          padding: '10px'
        }}>
          <Grid item xs={5}>
            <TextField fullWidth id="outlined-basic" label="Field Name" variant="outlined" type="text" value={newFieldName} size="small" onChange={(e) => {
              setNewFieldName(e.target.value);
            }} />
          </Grid>
          <Grid item xs={5}>
            <Select
              fullWidth
              value={newFieldTypeId}
              label="Field Type"
              size="small"
              onChange={(e) => {
                setNewFieldTypeId(Number(e.target.value));
              }}
            >
              {AppContextState.collectionFieldTypes.map((fieldType: any) => (
                <MenuItem key={`CollectionFieldsNewFieldList-${fieldType.id}`} value={fieldType.id}>{fieldType.name}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth variant="contained" onClick={saveNewField}>Add Field</Button>
          </Grid>
        </Grid>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageFields.map((field: any) => (
              <TableRow
                key={field.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{field.id}</TableCell>
                <TableCell>{field.name}</TableCell>
                <TableCell>{field.type.name}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="delete" size="small" onClick={() => {
                    deleteField(field);
                  }}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export {PageCardFieldsComponent};
