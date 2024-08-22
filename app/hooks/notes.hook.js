import React, { useState, createContext, useContext, useEffect } from "react";
import { getData } from "@/app/hooks/storage.hooks";

export const useNotes = () => {
  const [saved, setSaved] = useState(true);
  const [savedEnabled, setSavedEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dateFormat, setDateFormat] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const se = await getData("@savedenabled");
      const ne = await getData("@notificationsenabled");
      const df = await getData("@dateformat");
      setSavedEnabled(se);
      setNotificationsEnabled(ne);
      setDateFormat(df);
    };
    fetchSettings();
  }, []);

  return {
    saved,
    setSaved,
    notificationsEnabled,
    setNotificationsEnabled,
    savedEnabled,
    setSavedEnabled,
    dateFormat,
    setDateFormat,
  };
};

const NoteContext = createContext(null);

export const useNoteContext = () => useContext(NoteContext);

export const NoteContextProvider = ({ children }) => {
  const value = useNotes();
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
