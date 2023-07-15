import { useContext } from 'react';

import ColumnContext from '../context/ColumnContext';

const useColumn = () => useContext(ColumnContext);

export default useColumn;