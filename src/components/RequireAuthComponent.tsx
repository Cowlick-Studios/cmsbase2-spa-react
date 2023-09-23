import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';

import { AppContext } from '../contexts/AppContext';

function RequireAuthComponent( {children, enforce = true}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if(enforce){
      if(AppContextState.accessToken){
        setShow(true);
      } else {
        setShow(false);
        navigate('/login');
      }
    } else {
      setShow(true);
    }
  }, [enforce, AppContextState]);

  return (
    <>
      {show && children}
    </>
  );
}

export default RequireAuthComponent;
