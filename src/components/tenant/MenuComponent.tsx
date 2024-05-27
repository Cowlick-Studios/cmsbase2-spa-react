import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A, useLocation } from 'react-router-dom';
import {axios, useAxios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PeopleIcon from '@mui/icons-material/People';
import ViewListIcon from '@mui/icons-material/ViewList';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SettingsIcon from '@mui/icons-material/Settings';
import Collapse from '@mui/material/Collapse';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import MailIcon from '@mui/icons-material/Mail';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import DescriptionIcon from '@mui/icons-material/Description';
import HttpIcon from '@mui/icons-material/Http';
import WebIcon from '@mui/icons-material/Web';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ArticleIcon from '@mui/icons-material/Article';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function MenuComponent( {children, enforce = true}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const location = useLocation();
  const http = useAxios();

  const [collectionOpen, setCollectionOpen] = useState(false);
  const [pageOpen, setPageOpen] = useState(false);

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
            navigate('/');
          }}>
            <ListItemButton selected={isCurrentRoute('/')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => {
            navigate('/client_analytics');
          }}>
            <ListItemButton selected={isCurrentRoute('/client_analytics')}>
              <ListItemIcon>
                <AnalyticsIcon />
              </ListItemIcon>
              <ListItemText primary="Client Analytics" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => {
            navigate('/item');
          }}>
            <ListItemButton selected={isCurrentRoute('/item')}>
              <ListItemIcon>
                <LooksOneIcon />
              </ListItemIcon>
              <ListItemText primary="Item" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => {
            if(location.pathname.includes('/page/')){
              navigate('/page');
              setPageOpen(true);
            } else if(location.pathname.includes('/page')){
              navigate('/page');
              setPageOpen(!pageOpen);
            } else {
              navigate('/page');
              setPageOpen(true);
            }

            }}>
            <ListItemButton selected={isCurrentRoute('/page')}>
              <ListItemIcon>
                <WebIcon />
              </ListItemIcon>
              <ListItemText primary="Pages" />
              {pageOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={pageOpen} timeout="auto" unmountOnExit>
            <List>
              {AppContextState.pages.map((page: any) => (
                <ListItem disablePadding key={`menuCollectionList-${page.name}`} onClick={() => {
                  navigate(`/page/${page.name}/document`);
                }}>
                  <ListItemButton selected={isCurrentRoute(`/page/${page.name}/document`)} sx={{ pl: 3 }}>
                    <ListItemIcon>
                      <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText primary={page.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          <ListItem disablePadding onClick={() => {

            if(location.pathname.includes('/collection/')){
              navigate('/collection');
              setCollectionOpen(true);
            } else if(location.pathname.includes('/collection')){
              navigate('/collection');
              setCollectionOpen(!collectionOpen);
            } else {
              navigate('/collection');
              setCollectionOpen(true);
            }

          }}>
            <ListItemButton selected={isCurrentRoute('/document')}>
              <ListItemIcon>
                <FolderCopyIcon />
              </ListItemIcon>
              <ListItemText primary="Collections" />
              {collectionOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={collectionOpen} timeout="auto" unmountOnExit>
            <List>
              {AppContextState.collections.map((collection: any) => (
                <ListItem disablePadding key={`menuCollectionList-${collection.name}`} onClick={() => {
                  navigate(`/collection/${collection.name}/documents`);
                }}>
                  <ListItemButton selected={isCurrentRoute(`/collection/${collection.name}/documents`)} sx={{ pl: 3 }}>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={collection.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          <ListItem disablePadding onClick={() => {
            navigate('/media');
          }}>
            <ListItemButton selected={isCurrentRoute('/media')}>
              <ListItemIcon>
                <PermMediaIcon />
              </ListItemIcon>
              <ListItemText primary="Media" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => {
            navigate('/mail');
          }}>
            <ListItemButton selected={isCurrentRoute('/mail')}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Mail" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => {
            navigate('/user');
          }}>
            <ListItemButton selected={isCurrentRoute('/user')}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => {
            navigate('/request');
          }}>
            <ListItemButton selected={isCurrentRoute('/request')}>
              <ListItemIcon>
                <HttpIcon />
              </ListItemIcon>
              <ListItemText primary="Requests" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => {
            navigate('/settings');
          }}>
            <ListItemButton selected={isCurrentRoute('/setting')}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>

        </List>
      )}
    </>
  );
}

export {MenuComponent};
