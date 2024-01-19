import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A, useParams } from 'react-router-dom';
import {http, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

function PagesDocumentPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  let {pageName} = useParams();

  return (
    <>
      <p>PagesDocumentPage: {pageName}</p>
    </>
  );
}

export {PagesDocumentPage};
