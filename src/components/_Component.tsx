import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {axios, useAxios} from '../services/http';
import { AppContext } from '../contexts/AppContext';

import Grid from '@mui/material/Grid';

function _Component( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  return (
    <>
      <p>Component</p>
    </>
  );
}

export {_Component};
