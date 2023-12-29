import { createContext, useState } from "react";

export const data_context = createContext(null);

export default function DataContextProvider({children}) {
    const [listData, setListData] = useState([]);
    const [tables, setTables] = useState([]);
    const [selectedlist, setSelectedlist] = useState([]);
    const [targetIndex, setTargetIndex] = useState();
    const [error, setError] = useState();
    return(
       <data_context.Provider value={{listData, setListData, tables, setTables, selectedlist, setSelectedlist, targetIndex, setTargetIndex, error, setError}}>
        {children}
       </data_context.Provider>
    )
}

const tables = [
    {

    }
]