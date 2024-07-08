import { SafeAreaView, Text } from "react-native";
import styleAndroid from "./style/styleAndroid";
import styleNoteEditor from "./style/styleNoteEditor";
import React from "react";

const Settings = () => {
  return (
    <SafeAreaView style={styleAndroid.droidSafeArea}>
      <Text style={styleNoteEditor.noteTitle}>Settings</Text>
      <View></View>
    </SafeAreaView>
  );
};

export default Settings;
