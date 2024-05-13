import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';
import generateUrl from '../../utility/generateUrl';
import numeral from 'numeral';

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
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import MultiSelect from '../../components/utility/MultiSelect';

import { UploadImageComponent } from '../../components/tenant/media/UploadImageComponent';
import { ImageUpdateModalComponent } from '../../components/tenant/media/ImageUpdateModalComponent';

function MediaPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [images, setImages] = useState<any>([]);
  const [openImageUpdate, setOpenImageUpdate] = useState(false);
  const [selectedUpdateImage, setSelectedUpdateImage] = useState<any>({});
  const [tileView, setTileView] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<any>(undefined);
  const [newCollectionName, setNewCollectionName] = useState<string>("");

  useEffect(() => {
    http.get(`/file`).then((res: any) => {
      console.log(res.data.files);
      setImages(res.data.files);
    });

    http.get(`/file_collection`).then((res: any) => {
      setCollections(res.data.collections);
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

  const createNewCollection = () => {
    http.post(`/file_collection`, {
      name: newCollectionName
    }).then((res: any) => {
      setNewCollectionName("");
      setCollections([...collections, res.data.collection,]);
    });
  }

  const selectCollection = (event: any) => {
    setSelectedCollection(event.target.value);
    http.get(`/file`, {
      params: {
        collection_id: event.target.value?.id
      }
    }).then((res: any) => {
      console.log(res);
      setImages(res.data.files);
    });
  }

  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <UploadImageComponent images={images} setImages={setImages}/>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={6}>
            <FormControlLabel control={<Switch checked={tileView} onChange={(e) => {
              setTileView(e.target.checked);
            }} />} label="Tile View" />
          </Grid>
          <Grid item spacing={2} xs={6} container>
            <Grid item xs={10}>
              <TextField fullWidth label="New Collection" variant="outlined" value={newCollectionName} onChange={(e) => {
                    setNewCollectionName(e.target.value);
                  }} />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" onClick={createNewCollection}>Create</Button>
            </Grid>
            <Grid item xs={12}>
              {/* <MultiSelect options={collections} label="File Collection" onChange={onCollectionSelect}/> */}
              <FormControl fullWidth>
                <InputLabel id={`select-collection-search-file`}>Select Collection</InputLabel>
                <Select
                  labelId={`select-collection-search-file`}
                  fullWidth
                  value={selectedCollection}
                  label="Select Collection"
                  input={<OutlinedInput label="Select Collection" />}
                  onChange={selectCollection}
                >
                  {collections.map((option: any) => (
                    <MenuItem
                      key={option.id}
                      value={option}
                    >
                      {option.name}
                    </MenuItem>
                  ))}

                  <MenuItem
                    key='deselect'
                    value={undefined}
                  ><b>CLEAR</b></MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
                    <TableCell>File Size (MB)</TableCell>
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
                      <TableCell>{numeral(image.size / (1024 * 1024)).format('0,0.00')} MB</TableCell>

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
      
      <ImageUpdateModalComponent open={openImageUpdate} setOpen={setOpenImageUpdate} collections={collections} images={images} setImages={setImages} image={selectedUpdateImage}/>
    </>
  );
}

export {MediaPage};
