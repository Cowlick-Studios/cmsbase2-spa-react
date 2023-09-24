import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../services/http';
import { AppContext } from '../contexts/AppContext';

function _Page( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  return (
    <>
      <p>Page</p>
    </>
  );
}

export default _Page;
