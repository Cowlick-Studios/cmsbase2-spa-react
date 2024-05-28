import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { FormCardComponent } from '../../components/tenant/form/FormCardComponent';
import NewFormModalComponent from '../../components/tenant/form/NewFormModalComponent';

function FormPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [adminUsers, setAdminUsers] = useState<any>([]);
  const [formSubmissions, setFormSubmissions] = useState<any>([]);
  const [openNewFormSubmissionModal, setOpenNewFormSubmissionModal] = useState(false);

  useEffect(() => {
    http.get(`/user`, { 
      params: { 
        public: false
      } 
    }).then((res) => {
      setAdminUsers(res.data.users);
    });

    http.get(`/form_submission`).then((res) => {
      setFormSubmissions(res.data.form_submissions);
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => {
            setOpenNewFormSubmissionModal(true);
          }}>New Form Submission</Button>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {formSubmissions.map((formSubmission: any) => (
            <Grid item xs={12} key={`FormSubmissionList-${formSubmission.id}`}>
              <FormCardComponent formSubmission={formSubmission} formSubmissions={formSubmissions} setFormSubmissions={setFormSubmissions} adminUsers={adminUsers}/>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <NewFormModalComponent formSubmissions={formSubmissions} setFormSubmissions={setFormSubmissions} open={openNewFormSubmissionModal} setOpen={setOpenNewFormSubmissionModal}/>
    </>
  );
}

export {FormPage};
