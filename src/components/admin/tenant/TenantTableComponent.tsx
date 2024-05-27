import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';
import { TenantContext } from '../../../contexts/admin/TenantContext';
import looseStringCompare from '../../../utility/loseStringCompare';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import UpdateTenantModalComponent from './UpdateTenantModalComponent';

function TenantTableComponent( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const TenantContextState: any = useContext(TenantContext);
  const http = useAxios();

  const [searchedTenants, setSearchedTenants] = useState<any>([]);
  const [searchString, setSearchString] = useState('');
  const [openTenantUpdate, setOpenTenantUpdate] = useState(false);
  const [updateTenant, setUpdateTenant] = useState<any>({});

  useEffect(() => {
    setSearchedTenants(TenantContextState.tenants);
  }, [TenantContextState.tenants])

  const editTenant = (tenant: any) => {
    setUpdateTenant(tenant);
    setOpenTenantUpdate(true);
  }

  const deleteTenant = (tenant: any) => {
    http.delete(`/tenant/${tenant.id}`).then((res) => {
      TenantContextState.setTenants(TenantContextState.tenants.filter((tenantRecord: any) => {
        return tenantRecord.id !== tenant.id;
      }))
    });
  }

  const toggleTenantDisabled = (tenant: any, disabledState: boolean) => {
    http.patch(`/tenant/${tenant.id}`, {
      disabled: disabledState
    }).then((res) => {
      TenantContextState.setTenants(TenantContextState.tenants.map((tenantRecord: any) => {
        if(tenantRecord.id === tenant.id){
          tenantRecord.disabled = disabledState;
        }
        return tenantRecord;
      }))
    });
  }

  const searchTenants = (searchString: string) => {
    setSearchString(searchString);
    setSearchedTenants(TenantContextState.tenants.filter((tenant: any) => {
      return looseStringCompare(searchString, [tenant.id]);
    }));
  }

  return (
    <>
      <TextField size="small" fullWidth label="Search Tenants" variant="outlined" type="text" value={searchString} onChange={(e) => {
        searchTenants(e.target.value);
      }}/>
      <Card variant="outlined">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>File Limit (GB)</TableCell>
              <TableCell>Database Limit (GB)</TableCell>
              <TableCell>Disabled</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchedTenants.map((tenant: any) => (
              <TableRow
                key={tenant.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {tenant.id}
                </TableCell>
                <TableCell>{tenant.storage_limit_file} GB</TableCell>
                <TableCell>{tenant.storage_limit_database} GB</TableCell>
                <TableCell>{tenant.disabled ? (
                  <Chip size="small" label="Disabled" color="error" />
                ) : (
                  <Chip size="small" label="Active" color="success" />
                )}</TableCell>
                <TableCell>{new Date(tenant.created_at).toLocaleDateString()}</TableCell>
                <TableCell>

                  <IconButton aria-label="edit" onClick={() => {
                    editTenant(tenant);
                  }}>
                    <EditIcon />
                  </IconButton>

                  <IconButton aria-label="delete" onClick={() => {
                    deleteTenant(tenant);
                  }}>
                    <DeleteIcon />
                  </IconButton>

                  {tenant.disabled ? (
                    <IconButton aria-label="enable" onClick={() => {
                      toggleTenantDisabled(tenant, false);
                    }}>
                      <VisibilityIcon />
                    </IconButton>
                  ) : (
                    <IconButton aria-label="disable" onClick={() => {
                      toggleTenantDisabled(tenant, true);
                    }}>
                      <VisibilityOffIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <UpdateTenantModalComponent open={openTenantUpdate} setOpen={setOpenTenantUpdate} tenant={updateTenant}/>
    </>
  );
}

export default TenantTableComponent;
