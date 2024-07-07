import React, { useState } from "react";
import { View } from "react-native";
import EditNote from "./components/EditNote";
import { useNoteContext, NoteContextProvider } from "@/app/utils/NoteContext";
import AppHeader from "@/app/components/AppHeader";

const HomeScreen = () => {
  const [date, setDate] = useState(null);
  const { currentDate } = useNoteContext();

  return (
    <View>
      <NoteContextProvider>
        <AppHeader />
        <EditNote />
      </NoteContextProvider>
    </View>
  );
};

export default HomeScreen;
