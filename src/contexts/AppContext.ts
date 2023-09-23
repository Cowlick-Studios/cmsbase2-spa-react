import React from 'react';

export const AppContext = React.createContext({
  accessToken: null,
  setAccessToken: (value: any) => {},
  user: null,
  setUser: (value: any) => {}
});
