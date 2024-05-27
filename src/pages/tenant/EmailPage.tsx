import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { EmailCardComponent } from '../../components/tenant/email/EmailCardComponent';
import NewEmailModalComponent from '../../components/tenant/email/NewEmailModalComponent';

function EmailPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [adminUsers, setAdminUsers] = useState<any>([]);
  const [emailSubmissions, setEmailSubmissions] = useState<any>([]);
  const [openNewEmailSubmissionModal, setOpenNewEmailSubmissionModal] = useState(false);

  useEffect(() => {
    http.get(`/user`, { 
      params: { 
        public: false
      } 
    }).then((res) => {
      setAdminUsers(res.data.users);
    });

    http.get(`/email_submission`).then((res) => {
      setEmailSubmissions(res.data.email_submissions);
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => {
            setOpenNewEmailSubmissionModal(true);
          }}>New Email Submission</Button>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {emailSubmissions.map((emailSubmission: any) => (
            <Grid item xs={12} key={`EmailSubmissionList-${emailSubmission.id}`}>
              <EmailCardComponent emailSubmission={emailSubmission} emailSubmissions={emailSubmissions} setEmailSubmissions={setEmailSubmissions} adminUsers={adminUsers}/>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <NewEmailModalComponent emailSubmissions={emailSubmissions} setEmailSubmissions={setEmailSubmissions} open={openNewEmailSubmissionModal} setOpen={setOpenNewEmailSubmissionModal}/>
    </>
  );
}

export {EmailPage};
