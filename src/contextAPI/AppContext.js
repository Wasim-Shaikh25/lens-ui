// DataContext.js
import React, { createContext, useState, useContext } from 'react';



export const AppContext = createContext();


export default function AppContextProvider({children}){

    const [editData, setEditData] = useState(null);

   const value = {
       editData,
       setEditData
    }

    
    return <AppContext.Provider value = {value}>
        {children}
    </AppContext.Provider>

}
