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
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { UploadImageComponent } from '../../components/tenant/media/UploadImageComponent';
import { ImageUpdateModalComponent } from '../../components/tenant/media/ImageUpdateModalComponent';

function MediaPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [images, setImages] = useState<any>([]);
  const [openImageUpdate, setOpenImageUpdate] = useState(false);
  const [selectedUpdateImage, setSelectedUpdateImage] = useState<any>({});
  const [tileView, setTileView] = useState(false);

  useEffect(() => {
    http.get(`/file`).then((res: any) => {
      setImages(res.data.files);
    });
  }, []);

  const openFileEdit = (file: any) => {
    setSelectedUpdateImage(file);
    setOpenImageUpdate(true);
  }

  const deleteFile = (file: any) => {
    http.delete(`/file/${file.id}`).then((res: any) => {
      setImages(images.filter((imageRecord: any) => {
        return imageRecord.id !== file.id;
      }));
    });
  }

  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <UploadImageComponent images={images} setImages={setImages}/>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Switch checked={tileView} onChange={(e) => {
            setTileView(e.target.checked);
          }} />} label="Tile View" />
        </Grid>
        <Grid item xs={12}>
          {tileView ? (
            <ImageList variant="masonry" cols={4} gap={8}>
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
          ) : (
            <Card variant='outlined'>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Name</TableCell>
                    <TableCell>Mime Type</TableCell>
                    <TableCell>Dimension (W/H)</TableCell>
                    <TableCell>File Size (bytes)</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {images.map((image: any) => (
                    <TableRow
                      key={`ImageListTable-${image.id}`}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        <img
                          width="100px"
                          srcSet={generateUrl(image.uri, AppContextState.tenant)}
                          src={generateUrl(image.uri, AppContextState.tenant)}
                          alt={image.name}
                          loading="lazy"
                        />
                      </TableCell>

                      <TableCell>{image.file}</TableCell>
                      <TableCell>{image.mime_type}</TableCell>
                      <TableCell>{image.width}px / {image.height}px</TableCell>
                      <TableCell>{image.size} bytes</TableCell>

                      <TableCell align="right">

                        <IconButton aria-label="edit" size="small" onClick={() => {
                          openFileEdit(image);
                        }}>
                          <EditIcon fontSize="inherit" />
                        </IconButton>

                        <IconButton aria-label="delete" size="small" onClick={() => {
                          deleteFile(image);
                        }}>
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </Grid>
      </Grid>
      
      <ImageUpdateModalComponent open={openImageUpdate} setOpen={setOpenImageUpdate} images={images} setImages={setImages} image={selectedUpdateImage}/>
    </>
  );
}

export {MediaPage};
