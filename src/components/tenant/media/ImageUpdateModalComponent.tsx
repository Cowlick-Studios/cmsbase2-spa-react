import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';
import generateUrl from '../../../utility/generateUrl';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Badge from '@mui/material/Badge';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import CloseIcon from '@mui/icons-material/Close';

import Modal from '../../utility/Modal';

function ImageUpdateModalComponent( {open, setOpen, images, setImages, image}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [name, setName] = useState("");
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    setName(image.name || "");
    setAltText(image.alternative_text || "");
    setCaption(image.caption || "");
  }, [image]);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setName('');
    setAltText('');
    setCaption('');

    setOpen(false);
  }

  const toggle = () => {
    open ? handleClose() : handleOpen();
  }

  const saveImage = () => {

    const reqObj: any = {
      name: name,
      alternative_text: altText,
      caption: caption
    }

    if(name === image.name){
      delete reqObj.name;
    }

    http.patch(`/file/${image.id}`, reqObj).then((res: any) => {
      setImages(images.map((imageRecord: any) => {
        if(imageRecord.id === res.data.file.id){
          return res.data.file;
        }
        return imageRecord;
      }));

      handleClose();
    });
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Card sx={{
          padding: '10px'
        }}>
          <CardContent>
            <Grid container spacing={2}>

              <Grid container item xs={6}>
                <img className='imageResize' src={generateUrl(image.uri, AppContextState.tenant)} alt='UpdateImageInstance'/>
              </Grid>

              <Grid container item xs={6} spacing={2}>
                <Grid item xs={12}>
                  <p>{image.file}</p>
                  <p>{image.mime_type}</p>
                  <p>{image.width}px / {image.height}px</p>
                  <p>{image.size} bytes</p>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="File Name" variant="outlined" type="text" value={name} onChange={(e) => {
                    setName(e.target.value);
                  }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Alt Text" variant="outlined" type="text" value={altText} onChange={(e) => {
                    setAltText(e.target.value);
                  }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Caption" variant="outlined" type="text" value={caption} onChange={(e) => {
                    setCaption(e.target.value);
                  }} />
                </Grid>
                <Grid container item xs={12} gap={1}>
                  <Button variant="contained" onClick={saveImage}>Save</Button>
                  <Button color="error" variant="contained" onClick={handleClose}>Close</Button>
                </Grid>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

export {ImageUpdateModalComponent};
