import React from 'react';

export const UserContext = React.createContext({
  users: null,
  setUsers: (value: any) => {}
});
