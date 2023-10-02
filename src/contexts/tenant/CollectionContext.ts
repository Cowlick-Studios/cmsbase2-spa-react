import React from 'react';

export const CollectionContext = React.createContext({
  collections: null,
  setCollections: (value: any) => {}
});
