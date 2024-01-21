import React from 'react';

export const AppContext = React.createContext({
  accessToken: null,
  setAccessToken: (value: any) => {},
  user: null,
  setUser: (value: any) => {},
  tenant: null,
  setTenant: (value: any) => {},
  url: null,
  setUrl: (value: any) => {},
  collections: null,
  setCollections: (value: any) => {},
  fieldTypes: null,
  setFieldTypes: (value: any) => {},
  pages: null,
  setPages: (value: any) => {},
});
