import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';
import generateUrl from '../../utility/generateUrl';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Card, Box, CardContent } from '@mui/material';
import Badge from '@mui/material/Badge';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import CloseIcon from '@mui/icons-material/Close';

import { UploadImageComponent } from '../../components/tenant/media/UploadImageComponent';
import { ImageUpdateModalComponent } from '../../components/tenant/media/ImageUpdateModalComponent';

function MediaPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [images, setImages] = useState<any>([]);
  const [openImageUpdate, setOpenImageUpdate] = useState(false);
  const [selectedUpdateImage, setSelectedUpdateImage] = useState<any>({});

  useEffect(() => {
    http.get(`/file`).then((res: any) => {
      setImages(res.data.files);
    });
  }, []);

  const openFileEdit = (file: any) => {
    setSelectedUpdateImage(file);
    setOpenImageUpdate(true);
  }

  return (
    <>
      <UploadImageComponent images={images} setImages={setImages}/>

      <ImageList variant="masonry" cols={3} gap={8}>
        {images.map((image: any) => (
          <ImageListItem key={`ImageListItem-${image.id}`}>
            <img
              className='hoverClick'
              srcSet={generateUrl(image.uri, AppContextState.tenant)}
              src={generateUrl(image.uri, AppContextState.tenant)}
              alt={image.name}
              loading="lazy"
              onClick={() => {
                openFileEdit(image);
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <ImageUpdateModalComponent open={openImageUpdate} setOpen={setOpenImageUpdate} images={images} setImages={setImages} image={selectedUpdateImage}/>
    </>
  );
}

export {MediaPage};
