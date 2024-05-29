import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import { Grid, Button } from '@mui/material';

import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';


function UnlayerBuilder( {mailer, mailers, setMailers}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const emailEditorRef = useRef<EditorRef>(null);

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)

    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);

    unlayer.loadDesign(JSON.parse(mailer.unlayer_data));
  };

  const saveMailer = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data: any) => {
      const {html, design} = data;

      http.patch(`/marketing_mailer/${mailer.id}`, {
        unlayer_data: JSON.stringify(design),
        html: html
      }).then((res) => {
        setMailers(mailers.map((mailerItem: any) => {
          if(mailerItem.id === res.data.mailer.id){
            return res.data.mailer
          }
          return mailerItem;
        }));
      });
    });
  }

  return (
    <>
      <Grid container gap={2}>
        <Grid item container xs={12} justifyContent="flex-end">
          <Button variant="contained" onClick={() => {
            saveMailer();
          }}>save</Button>
        </Grid>
        <Grid item xs={12}>
          <EmailEditor ref={emailEditorRef} onReady={onReady} style={{ height: '74vh' }} />
        </Grid>
      </Grid>
    </>
  );
}

export default UnlayerBuilder;
