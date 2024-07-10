import React, { useState, createContext, useContext, useEffect } from "react";
import { getData } from "@/app/utils/storageTools";

export const useNotes = () => {
  const [saved, setSaved] = useState(true);
  const [savedEnabled, setSavedEnabled] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const se = await getData("@savedenabled");
      setSavedEnabled(se);
    };
    fetchSettings();
  }, []);

  return {
    saved,
    setSaved,
    savedEnabled,
    setSavedEnabled,
  };
};

const NoteContext = createContext(null);

export const useNoteContext = () => useContext(NoteContext);

export const NoteContextProvider = ({ children }) => {
  const value = useNotes();
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
