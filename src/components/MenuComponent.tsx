import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';

import { AppContext } from '../contexts/AppContext';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PeopleIcon from '@mui/icons-material/People';

function MenuComponent( {children, enforce = true}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  return (
    <>
      <List>
        <ListItem disablePadding onClick={() => {
          navigate('/');
        }}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => {
          navigate('/tenant');
        }}>
          <ListItemButton>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary="Tenants" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => {
          navigate('/user');
        }}>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default MenuComponent;
