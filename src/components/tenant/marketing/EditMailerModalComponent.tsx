import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';
import { TenantContext } from '../../../contexts/admin/TenantContext';

import { Card, Grid, Chip, FormControl } from '@mui/material';

import UnlayerBuilder from './UnlayerBuilder';

import Modal from '../../utility/Modal';

function EditMailerModalComponent( {open, setOpen, mailers, setMailers, mailer}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={handleClose}>
        <UnlayerBuilder mailer={mailer} mailers={mailers} setMailers={setMailers} />
      </Modal>
    </>
  );
}

export default EditMailerModalComponent;
