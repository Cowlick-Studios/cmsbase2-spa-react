import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';

import {axios, http} from '../services/http';
import { AppContext } from '../contexts/AppContext';

function LoginPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  return (
    <>
      <p>Login</p>
    </>
  );
}

export default LoginPage;
