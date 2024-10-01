import React, { useState, createContext, useContext, useEffect } from "react";
import { getData } from "@/app/hooks/storage.hooks";

export const useNotes = () => {
  const [saved, setSaved] = useState(true);
  const [savedEnabled, setSavedEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dateFormat, setDateFormat] = useState(null);
  const [notificationId, setNotificationId] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const se = await getData("@savedenabled");
      const ne = await getData("@notificationsenabled");
      const df = await getData("@dateformat");
      const nid = await getData("@notificationid");
      setSavedEnabled(se);
      setNotificationsEnabled(ne);
      setDateFormat(df);
      setNotificationId(nid);
    };
    fetchSettings();
  }, []);

  return {
    saved,
    setSaved,
    notificationsEnabled,
    setNotificationsEnabled,
    notificationId,
    setNotificationId,
    savedEnabled,
    setSavedEnabled,
    dateFormat,
    setDateFormat,
    type,
    setType,
  };
};

const NoteContext = createContext(null);

export const useNoteContext = () => useContext(NoteContext);

export const NoteContextProvider = ({ children }) => {
  const value = useNotes();
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
