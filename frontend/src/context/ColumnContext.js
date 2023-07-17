import React, { createContext, useState, useEffect } from 'react';

const ColumnContext = createContext();

export function ColumnProvider({ children }) {
  const [columndata, setColumndata] = useState([]);

  return (
    <ColumnContext.Provider value={{ columndata, setColumndata }}>
      {children}
    </ColumnContext.Provider>
  );
}

export default ColumnContext;
