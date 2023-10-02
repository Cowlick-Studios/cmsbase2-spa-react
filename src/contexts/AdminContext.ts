import React from 'react';

export const AdminContext = React.createContext({
  config: null,
  setConfig: (value: any) => {},
});
