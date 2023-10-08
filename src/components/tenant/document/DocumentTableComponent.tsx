import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';

import { UpdateDocumentComponent } from './UpdateDocumentComponent';

function DocumentTableComponent( {collection, collectionFields, documents, setDocuments}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [openUpdateDocumentModal, setOpenUpdateDocumentModal] = useState(false);
  const [selectedUpdateDocument, setSelectedUpdateDocument] = useState<any>({});

  const deleteDocument = (document: any) => {
    http.delete(`/collection/${collection.name}/document/${document.id}`).then((res) => {
      setDocuments(documents.filter((documentRecord: any) => {
        return documentRecord.id !== document.id;
      }));
    });
  }

  const publishDocument = (document: any) => {
    http.patch(`/collection/${collection.name}/document/${document.id}`, {
      published: true
    }).then((res) => {
      setDocuments(documents.map((documentRecord: any) => {
        if(documentRecord.id === res.data.document.id){
          documentRecord.published = true;
        }
        return documentRecord;
      }));
    });
  }

  const unpublishDocument = (document: any) => {
    http.patch(`/collection/${collection.name}/document/${document.id}`, {
      published: false
    }).then((res) => {
      setDocuments(documents.map((documentRecord: any) => {
        if(documentRecord.id === res.data.document.id){
          documentRecord.published = false;
        }
        return documentRecord;
      }));
    });
  }

  const editDocument = (document: any) => {
    setSelectedUpdateDocument(document);
    setOpenUpdateDocumentModal(true);
  }

  return (
    <>
      <Card variant='outlined'>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Published</TableCell>

              {collectionFields.map((field: any) => (
                <TableCell key={`CollectionDocumentTableHeader-${field.id}`}>{field.name}</TableCell>
              ))}

              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((document: any) => (
              <TableRow
                key={document.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{document.id}</TableCell>
                <TableCell align='center'>{document.published ? (
                  <VisibilityIcon color='primary'/>
                ) : (
                  <VisibilityOffIcon color='warning'/>
                )}</TableCell>

                {collectionFields.map((field: any) => (
                  <TableCell key={`CollectionDocumentTableRow-${document.id}-${field.id}`}>{String(document[field.name])}</TableCell>
                ))}

                <TableCell>{document.created_at}</TableCell>
                <TableCell>{document.updated_at}</TableCell>
                <TableCell align="right">

                  <IconButton aria-label="edit" size="small" onClick={() => {
                    editDocument(document);
                  }}>
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  
                  {document.published ? (
                    <IconButton aria-label="delete" size="small" onClick={() => {
                      unpublishDocument(document);
                    }}>
                      <VisibilityOffIcon fontSize="inherit" />
                    </IconButton>
                  ) : (
                    <IconButton aria-label="delete" size="small" onClick={() => {
                      publishDocument(document);
                    }}>
                      <VisibilityIcon fontSize="inherit" />
                    </IconButton>
                  )}

                  <IconButton aria-label="delete" size="small" onClick={() => {
                    deleteDocument(document);
                  }}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <UpdateDocumentComponent open={openUpdateDocumentModal} setOpen={setOpenUpdateDocumentModal} collection={collection} collectionFields={collectionFields} documents={documents} setDocuments={setDocuments} document={selectedUpdateDocument}/>
    </>
  );
}

export {DocumentTableComponent};
