import React, {createContext, useContext} from "react";
import {getCurrentDate} from "./dateTools";

const NoteContext = createContext({
    currentDate: getCurrentDate(),
});

export const useNoteContext = () => useContext(NoteContext);
export const NoteContextProvider = ({children}) => {
    const value = getCurrentDate();
    return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}