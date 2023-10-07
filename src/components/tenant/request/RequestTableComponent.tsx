import React, { useState, useEffect, useContext, useRef } from 'react';
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

function RequestTableComponent( {requests}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const componentRef = useRef<HTMLDivElement | null>(null);

  const [componentWidth, setComponentWidth] = useState<any>(500);

  useEffect(() => {
    if (componentRef.current !== null) {
      setComponentWidth(componentRef.current.offsetWidth);
    }
  }, [componentRef]);

  const copyToClipboard = (copyText: string) => {
    navigator.clipboard.writeText(copyText);
  }

  return (
    <>
      <Card variant='outlined'>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Method</TableCell>
              <TableCell>Url</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>User Agent</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request: any) => (
              <TableRow
                key={`RequestListTable-${request.id}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {request.method === 'GET' && <Chip size="small" label={request.method} color="success" />}
                  {request.method === 'POST' && <Chip size="small" label={request.method} color="primary" />}
                  {request.method === 'PATCH' && <Chip size="small" label={request.method} color="warning" />}
                  {request.method === 'PUT' && <Chip size="small" label={request.method} color="warning" />}
                  {request.method === 'DELETE' && <Chip size="small" label={request.method} color="error" />}
                </TableCell>
                <TableCell className='hoverClick' onClick={() => {
                  copyToClipboard(request.url);
                }}>{request.url}</TableCell>
                <TableCell>{request.user_id ? request.user_id : "-"}</TableCell>
                <TableCell>
                  {(request.status >= 100 && request.status <= 199) && <Chip size="small" label={request.status} color="primary" />}
                  {(request.status >= 200 && request.status <= 299)  && <Chip size="small" label={request.status} color="success" />}
                  {(request.status >= 300 && request.status <= 399)  && <Chip size="small" label={request.status} color="warning" />}
                  {(request.status >= 400 && request.status <= 499)  && <Chip size="small" label={request.status} color="error" />}
                  {(request.status >= 500 && request.status <= 599)  && <Chip size="small" label={request.status} />}
                </TableCell>
                <TableCell className='hoverClick' onClick={() => {
                  copyToClipboard(request.user_agent);
                }}>{request.user_agent.substr(0, 39)}...</TableCell>
                <TableCell>{new Date(request.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export {RequestTableComponent};
