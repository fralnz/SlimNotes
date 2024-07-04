import React, { useState, useEffect, createContext, useContext } from "react";
import { Button, TextInput, View, Text } from "react-native";
import { ThemeContext } from "react-native-elements";
import EditNote from "./components/EditNote";
import { useNoteContext, NoteContextProvider } from "@/app/utils/NoteContext";
import {dateToString} from "@/app/utils/dateTools";

const HomeScreen = () => {
  const [date, setDate] = useState(null);
  const { currentDate } = useNoteContext();

  return (
    <View>
      <NoteContextProvider>
        <EditNote />
        {dateToString(currentDate)}
      </NoteContextProvider>
    </View>
  );
};

export default HomeScreen;
