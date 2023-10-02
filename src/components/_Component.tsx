import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../services/http';
import { AppContext } from '../contexts/AppContext';

import Grid from '@mui/material/Grid';

function _Component( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  return (
    <>
      <p>Component</p>
    </>
  );
}

export {_Component};
