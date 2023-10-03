import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { CardContent } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CollectionFieldTypesComponent( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [collectionFieldTypes, setCollectionFieldTypes] = useState<any>([]);

  useEffect(() => {
    http.get(`/collection_field_type`).then((res) => {
      console.log(res.data.types);
      setCollectionFieldTypes(res.data.types);
    });
  }, []);

  return (
    <>
      <Card variant='outlined'>

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Collection Field Types
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                Here you can view and edit all of the collection field types the system is aware of.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Accordion variant='outlined'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>Data</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Table size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Datatype</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {collectionFieldTypes.map((collectionFieldType: any) => (
                        <TableRow
                          key={`CollectionFieldTypeSettingsList-${collectionFieldType.id}`}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell>{collectionFieldType.id}</TableCell>
                          <TableCell>{collectionFieldType.name}</TableCell>
                          <TableCell>{collectionFieldType.datatype}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export {CollectionFieldTypesComponent};
