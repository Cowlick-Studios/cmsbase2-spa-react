import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { PageCardComponent } from '../../components/tenant/page/PageCardComponent';
import NewPageModalComponent from '../../components/tenant/page/NewPageModalComponent';

function PagesPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [pages, setPages] = useState<any>([]);
  const [openNewPageModal, setOpenNewPageModal] = useState(false);

  useEffect(() => {
    http.get(`/page`).then((res) => {
      setPages(res.data.pages);
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => {
            setOpenNewPageModal(true);
          }}>New Page</Button>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {pages.map((page: any) => (
            <Grid item xs={12} key={`CollectionList-${page.id}`}>
              <p>{page.name}</p>
              {/* <PageCardComponent collection={page} collections={pages} setCollections={setPages}/> */}
            </Grid>
          ))}
        </Grid>
      </Grid>

      <NewPageModalComponent pages={pages} setPages={setPages} open={openNewPageModal} setOpen={setOpenNewPageModal}/>
    </>
  );
}

export {PagesPage};
