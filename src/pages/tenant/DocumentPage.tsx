import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A, useParams } from 'react-router-dom';
import numeral from 'numeral';

import {axios, http} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

import { DocumentTableComponent } from '../../components/tenant/document/DocumentTableComponent';
import { NewDocumentModalComponent } from '../../components/tenant/document/NewDocumentModalComponent';

function DocumentPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  let {collectionName} = useParams();

  const [collection, setCollection] = useState<any>({});
  const [collectionFields, setCollectionFields] = useState<any>([]);
  const [documents, setDocuments] = useState<any>([]);
  const [openNewDocument, setOpenNewDocument] = useState(false);

  useEffect(() => {
    http.get(`/collection/${collectionName}/document`).then((res) => {
      setCollection(res.data.collection);
      setCollectionFields(res.data.collection.fields);
      setDocuments(res.data.documents);
    });
  }, [collectionName]);

  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Button variant='contained' onClick={() => {
            setOpenNewDocument(true);
          }}>New Document</Button>
        </Grid>

        <Grid item xs={12}>
          <DocumentTableComponent collection={collection} collectionFields={collectionFields} documents={documents} setDocuments={setDocuments}/>
        </Grid>
      </Grid>

      <NewDocumentModalComponent open={openNewDocument} setOpen={setOpenNewDocument} collection={collection} collectionFields={collectionFields} documents={documents} setDocuments={setDocuments}/>
    </>
  );
}

export {DocumentPage};
