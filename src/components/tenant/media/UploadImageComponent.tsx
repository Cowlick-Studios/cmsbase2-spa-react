import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Card, Box, CardContent } from '@mui/material';
import Badge from '@mui/material/Badge';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import CloseIcon from '@mui/icons-material/Close';

function UploadImageComponent( {images, setImages}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [files, setFiles] = useState<any>([]);

  const uploadFiles = (uploadedFilesObj: any) => {
    let uploadedFilesArr: any[] = [];

    for(let i = 0; i < uploadedFilesObj.length; i++){
      const uploadedFileObj = uploadedFilesObj[i];
      uploadedFileObj.previewURL = URL.createObjectURL(uploadedFileObj);
      uploadedFilesArr = [...uploadedFilesArr, uploadedFileObj];
    }

    console.log([...files, ...uploadedFilesArr]);
    setFiles([...files, ...uploadedFilesArr]);
  }

  const removeFileFromUpload = (file: any) => {
    setFiles(files.filter((fileRecord: any) => {
      return fileRecord.previewURL !== file.previewURL;
    }))
  }

  const bulkSave = () => {
    http.post(`/file/bulk`, {
      files: files
    },{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res: any) => {
      setImages([...res.data.uploaded, ...images]);
      setFiles([]);
    });
  }

  return (
    <>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload file
        <input hidden multiple type="file" onChange={(e) => {
          uploadFiles(e.target.files);
        }}/>
      </Button>

      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={() => {
        bulkSave();
      }}>
        Save
      </Button>

      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={1}>
            {files.map((file: any, index: number) => (
              <Grid item key={`ImageForUpload-${index}`}> 
                <Badge className='hoverClick' badgeContent={<CloseIcon sx={{width: '10px'}} />} color="error" onClick={() => {
                  removeFileFromUpload(file);
                }}>
                  <img src={file.previewURL} alt={file.name} width='100'/>
                </Badge>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export {UploadImageComponent};
