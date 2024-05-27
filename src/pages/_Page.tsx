import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../services/http';
import { AppContext } from '../contexts/AppContext';

function _Page( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  return (
    <>
      <p>Page</p>
    </>
  );
}

export {_Page};
