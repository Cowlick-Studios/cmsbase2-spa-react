import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import { Grid, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';


function UnlayerBuilder( {mailer, mailers, setMailers}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const emailEditorRef = useRef<EditorRef>(null);

  const [mailerName, setMailerName] = useState<string>("");
  const [mailerSubject, setMailerSubject] = useState<string>("");

  useEffect(() => {
    setMailerName(mailer.name);
    setMailerSubject(mailer.subject);
  }, [mailer]);

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
        name: mailerName,
        subject: mailerSubject,
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
      <Grid container spacing={2} sx={{paddingTop: '10px'}}>
        <Grid item container xs={5} justifyContent="flex-end">
          <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" type="text" value={mailerName} size="small" onChange={(e) => {
            setMailerName(e.target.value);
          }} />
        </Grid>
        <Grid item container xs={5} justifyContent="flex-end">
          <TextField fullWidth id="outlined-basic" label="Subject" variant="outlined" type="text" value={mailerSubject} size="small" onChange={(e) => {
            setMailerSubject(e.target.value);
          }} />
        </Grid>
        <Grid item container xs={2} justifyContent="flex-end">
          <Button fullWidth variant="contained" onClick={() => {
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
