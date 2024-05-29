import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';
import { TenantContext } from '../../../contexts/admin/TenantContext';

import { Card, Grid, Chip, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import DeleteIcon from '@mui/icons-material/Delete';

import Modal from '../../utility/Modal';

function EditListModalComponent( {open, setOpen, lists, setLists, listId}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [list, setList] = useState<any>({});
  const [subscribers, setSubscribers] = useState<any[]>([]);

  const [newSubscriberEmail, setNewSubscriberEmail] = useState<string>('');

  const [merketingListName, setMerketingListName] = useState<string>("");
  const [merketingListDescription, setMerketingListDescription] = useState<string>("");
  const [selectedCaptcha, setSelectedCaptcha] = useState("none");
  const [recaptchaEnable, setRecaptchaEnable] = useState<boolean>(false);
  const [recaptchaSecret, setRecaptchaSecret] = useState<string>("");
  const [turnstileEnable, setTurnstileEnable] = useState<boolean>(false);
  const [turnstileSecret, setTurnstileSecret] = useState<string>("");

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    if(open){
      http.get(`/marketing_list/${listId}`).then((res) => {
        setList(res.data.list);
        setSubscribers(res.data.list.subscribers);

        setMerketingListName(res.data.list.name);
        setMerketingListDescription(res.data.list.description);

        setRecaptchaEnable(res.data.list.recaptcha);
        setRecaptchaSecret(res.data.list.recaptcha_secret);
        setTurnstileEnable(res.data.list.turnstile);
        setTurnstileSecret(res.data.list.turnstile_secret);

        if(res.data.list.recaptcha){
          setSelectedCaptcha('recaptcha');
        } else if(res.data.list.turnstile){
          setSelectedCaptcha('turnstile');
        } else {
          setSelectedCaptcha('none');
        }
      });
    }
  }, [open]);

  const addSubscriber = () => {
    http.post(`/marketing_list/${listId}/subscription`, {
      email: newSubscriberEmail
    }).then((res) => {
      setSubscribers([res.data.subscription, ...subscribers]);
      setNewSubscriberEmail('');
    });
  }

  const removeSubscriber = (subscriber: any) => {
    http.delete(`/marketing_list/${listId}/subscription/${subscriber.id}`).then((res) => {
      setSubscribers(subscribers.filter((sub) => {
        return sub.id !== subscriber.id;
      }));
    });
  }

  const saveList = () => {
    http.patch(`/marketing_list/${listId}`, {
      name: merketingListName ? merketingListName : "",
      description: merketingListDescription ? merketingListDescription : "",
      recaptcha: turnstileEnable ? false : recaptchaEnable,
      recaptcha_secret: recaptchaSecret ? recaptchaSecret : "",
      turnstile: recaptchaEnable ? false : turnstileEnable,
      turnstile_secret: turnstileSecret ? turnstileSecret : "",
    }).then((res: any) => {
      setMerketingListName(res.data.list.name);
      setMerketingListDescription(res.data.list.description);
      setRecaptchaEnable(res.data.list.recaptcha);
      setRecaptchaSecret(res.data.list.recaptcha_secret);
      setTurnstileEnable(res.data.list.turnstile);
      setTurnstileSecret(res.data.list.turnstile_secret);
    });
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={handleClose}>
        <Grid container spacing={5}>

          <Grid item container xs={12}>
            <Grid item container xs={12} spacing={1}>
              <Grid item container xs={12}>
                <TextField fullWidth id="outlined-basic" label="List name" variant="outlined" type="email" value={merketingListName} size="small" onChange={(e) => {
                    setMerketingListName(e.target.value);
                  }} />
              </Grid>
              <Grid item container xs={12}>
                <TextField fullWidth id="outlined-basic" label="List Description" variant="outlined" type="email" value={merketingListDescription} size="small" onChange={(e) => {
                    setMerketingListDescription(e.target.value);
                  }} />
              </Grid>

              {/* Captcha */}
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">CAPTCHA</FormLabel>
                  <RadioGroup
                    row
                    defaultValue="none"
                    value={selectedCaptcha}
                    onChange={(event: any) => {
                      setSelectedCaptcha(event.target.value);
                    }}
                  >
                    <FormControlLabel value="none" control={<Radio />} label="NONE" />
                    <FormControlLabel value="recaptcha" control={<Radio />} label="reCAPTCHA" />
                    <FormControlLabel value="turnstile" control={<Radio />} label="Turnstile" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {(selectedCaptcha != "recaptcha") || <>
                <Grid item xs={12}>
                  <FormControlLabel control={<Switch checked={recaptchaEnable} onChange={(e) => {
                    setRecaptchaEnable(e.target.checked);
                  }} />} label="Enable" />

                  <TextField fullWidth label="Secret" variant="outlined" type="text" value={recaptchaSecret} size="small" onChange={(e) => {
                    setRecaptchaSecret(e.target.value);
                  }} />
                </Grid>
              </>}

              {(selectedCaptcha != "turnstile") || <>
                <Grid item xs={12}>
                  <FormControlLabel control={<Switch checked={turnstileEnable} onChange={(e) => {
                    setTurnstileEnable(e.target.checked);
                  }} />} label="Enable" />

                  <TextField fullWidth label="Secret" variant="outlined" type="text" value={turnstileSecret} size="small" onChange={(e) => {
                    setTurnstileSecret(e.target.value);
                  }} />
                </Grid>
              </>}

              <Grid item container xs={12}>
                <Button fullWidth variant="contained" onClick={() => {
                  saveList();
                }}>Save</Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={12}>
            <Grid item container xs={12} spacing={1}>
              <Grid item container xs={10}>
                <TextField fullWidth id="outlined-basic" label="New Subscriber Email" variant="outlined" type="email" value={newSubscriberEmail} size="small" onChange={(e) => {
                    setNewSubscriberEmail(e.target.value);
                  }} />
              </Grid>
              <Grid item container xs={2}>
                <Button fullWidth variant="contained" onClick={() => {
                  addSubscriber();
                }}>Add</Button>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Card variant='outlined' sx={{
                  maxHeight: '500px',
                  overflowY: 'scroll'
                }}>
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subscribers.map((subscriber: any) => (
                      <TableRow
                        key={`MarketingListTable-${list.id}-subscribers-${subscriber.id}`}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{subscriber.id}</TableCell>
                        <TableCell>{subscriber.email}</TableCell>

                        <TableCell align="right">
                          <IconButton aria-label="delete" size="small" onClick={() => {
                            removeSubscriber(subscriber);
                          }}>
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </Grid>
          </Grid>

        </Grid>
      </Modal>
    </>
  );
}

export default EditListModalComponent;
