import React, { useState, createContext, useContext } from "react";

export const useNotes = () => {
  const [saved, setSaved] = useState([]);

  return {
    saved,
    setSaved,
  };
};

const NoteContext = createContext(null);

export const useNoteContext = () => useContext(NoteContext);

export const NoteContextProvider = ({ children }) => {
  const value = useNotes();
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
