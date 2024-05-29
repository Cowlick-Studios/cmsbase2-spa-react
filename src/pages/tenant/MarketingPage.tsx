import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import { Grid } from '@mui/material';

import UnlayerBuilder from '../../components/tenant/marketing/UnlayerBuilder';
import MailingListsComponent from '../../components/tenant/marketing/MailingListsComponent';
import MailersComponent from '../../components/tenant/marketing/MailersComponent';

function MarketingPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  useEffect(() => {
    
  }, []);

  return (
    <>
      <Grid container gap={5}>
        <Grid item container xs={12}>
          <MailersComponent/>
        </Grid>

        <Grid item container xs={12}>
          <MailingListsComponent/>
        </Grid>
        
      </Grid>

      {/* <UnlayerBuilder/> */}
    </>
  );
}

export {MarketingPage};
