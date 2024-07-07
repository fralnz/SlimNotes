import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import EditNote from "./components/EditNote";
import { useNoteContext, NoteContextProvider } from "@/app/utils/NoteContext";
import AppHeader from "@/app/components/AppHeader";
import styleAndroid from "@/app/style/styleAndroid";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styleAndroid.droidSafeArea}>
      <NoteContextProvider>
        <AppHeader />
        <EditNote />
      </NoteContextProvider>
    </SafeAreaView>
  );
};

export default HomeScreen;
