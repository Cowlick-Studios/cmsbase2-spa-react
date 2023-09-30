import React from 'react';

export const TenantContext = React.createContext({
  tenants: null,
  setTenants: (value: any) => {}
});
