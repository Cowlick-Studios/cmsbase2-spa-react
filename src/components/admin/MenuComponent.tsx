import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A, useLocation } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';

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
  const location = useLocation();

  const isCurrentRoute = (path: string): boolean => {
    if(location.pathname === path){
      return true;
    }
    return false;
  }

  return (
    <>
      {AppContextState.accessToken && (
        <List>
          <ListItem disablePadding onClick={() => {
            navigate('/admin');
          }}>
            <ListItemButton selected={isCurrentRoute('/')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => {
            navigate('/admin/tenant');
          }}>
            <ListItemButton selected={isCurrentRoute('/tenant')}>
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary="Tenants" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => {
            navigate('/admin/user');
          }}>
            <ListItemButton selected={isCurrentRoute('/user')}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </>
  );
}

export {MenuComponent};
