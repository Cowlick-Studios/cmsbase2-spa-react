import React, { useEffect, useState } from 'react';
import { useNavigate, Link as A, useLocation } from 'react-router-dom'

import { AppContext } from './contexts/AppContext';

import Router from "./Router";

import {MenuComponent as AdminMenuComponent} from './components/admin/MenuComponent';
import {MenuComponent as TenantMenuComponent} from './components/tenant/MenuComponent';

import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  minHeight: `calc(100vh - 64px - 16px - 16px)`,
  marginTop: `64px`,
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function App() {

  const navigate = useNavigate();

  const [accessToken, setAccessToken]: any = useState(() => {
    const localAccessToken = localStorage.getItem("access_token");
    if(localAccessToken){
      return JSON.parse(localAccessToken);
    }
    return null;
  });

  const [user, setUser]: any = useState(() => {
    const localUser = localStorage.getItem("user");
    if(localUser){
      return JSON.parse(localUser);
    }
    return null;
  });

  const [tenant, setTenant]: any = useState(() => {
    const localTenant = localStorage.getItem("tenant");
    if(localTenant){
      return JSON.parse(localTenant);
    }
    return null;
  });

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  }

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("tenant");

    setAccessToken(null);
    setUser(null);
    setTenant(null);

    navigate('/login');
  }

  return (
    <>
      <AppContext.Provider
        value={{
          accessToken,
          setAccessToken,
          user,
          setUser,
          tenant,
          setTenant
        }}
      >
        <div>
          <Box sx={{ display: 'flex' }}>

            <AppBar position="fixed" open={open}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  CMS Base
                </Typography>
                {accessToken ? (
                  <Button color="inherit" onClick={() => {
                    logout();
                  }}>Logout</Button>
                ) : (
                  <Button color="inherit" onClick={() => {
                    navigate('/login');
                  }}>Login</Button>
                )}
              </Toolbar>
            </AppBar>

            <Drawer 
              open={open}
              variant="persistent"
              anchor="left"
            >
              <Box sx={{width: drawerWidth}}>
                <nav>
                  <DrawerHeader>
                    <IconButton onClick={toggleDrawer}>
                      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                  </DrawerHeader>
                  <Divider />
                  {tenant ? (
                    <TenantMenuComponent/>
                  ) : (
                    <AdminMenuComponent/>
                  )}
                </nav>
              </Box>
            </Drawer>

            <Main open={open}>
              <Box>
                <Router/>
              </Box>
            </Main>
          </Box>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
