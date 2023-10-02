import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import numeral from 'numeral';

import {axios, http} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { CollectionCardComponent } from '../../components/tenant/collection/CollectionCardComponent';
import NewCollectionModalComponent from '../../components/tenant/collection/NewCollectionModalComponent';

function CollectionPage() {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [collections, setCollections] = useState<any>([]);
  const [openNewCollectionModal, setOpenNewCollectionModal] = useState(false);

  useEffect(() => {
    http.get(`/collection`).then((res) => {
      setCollections(res.data.collections);
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => {
            setOpenNewCollectionModal(true);
          }}>New Collection</Button>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {collections.map((collection: any) => (
            <Grid item xs={12} key={`CollectionList-${collection.id}`}>
              <CollectionCardComponent collection={collection} collections={collections} setCollections={setCollections}/>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <NewCollectionModalComponent collections={collections} setCollections={setCollections} open={openNewCollectionModal} setOpen={setOpenNewCollectionModal}/>
    </>
  );
}

export {CollectionPage};
