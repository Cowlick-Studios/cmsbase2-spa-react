import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';

import {axios, http} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';
import { TenantContext } from '../../contexts/admin/TenantContext';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import NewTenantModalComponent from '../../components/admin/tenant/NewTenantModalComponent';
import TenantTableComponent from '../../components/admin/tenant/TenantTableComponent';

function TenantPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [tenants, setTenants] = useState<any>([]);
  const [openNewTenant, setOpenNewTenant] = useState(false);

  useEffect(() => {
    http.get(`/tenant`).then((res) => {
      setTenants(res.data.tenants);
    });
  }, []);

  return (
    <>
    <TenantContext.Provider
        value={{
          tenants,
          setTenants,
        }}
      >
        <Grid container gap={2}>
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => {
              setOpenNewTenant(!openNewTenant);
            }}>New Tenant</Button>
          </Grid>
          <Grid item xs={12}>
            <TenantTableComponent/>
          </Grid>
        </Grid>

        <NewTenantModalComponent open={openNewTenant} setOpen={setOpenNewTenant}/>
      </TenantContext.Provider>
    </>
  );
}

export default TenantPage;
