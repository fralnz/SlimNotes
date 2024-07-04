import React, { useState } from "react";
import { View } from "react-native";
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
      </NoteContextProvider>
    </View>
  );
};

export default HomeScreen;
