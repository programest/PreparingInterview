import { createContext, useState, useContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('user')) || []);

    const updateData = (newData) => {
        setData(newData);
        localStorage.setItem('user', JSON.stringify(newData));
    };

    return (
        <DataContext.Provider value={{ data, updateData }}>
            {children}
        </DataContext.Provider>
    );
};

