import { Pressable, SafeAreaView, Text, View } from "react-native";
import styleAndroid from "./style/styleAndroid";
import styleNoteEditor from "./style/styleNoteEditor";
import React, { useState } from "react";
import { removeAll } from "./hooks/storage.hooks";
import styleConfig from "./style/styleConfig";
import BackHeader from "./components/BackHeader";
import { DatePicker, SavedSwitch } from "./components/SettingsComponents";
import DeleteAllModal from "./components/DeleteAllModal";
import DeleteAllButton from "./components/DeleteAllButton";

const Settings = () => {
  return (
    <SafeAreaView style={styleAndroid.droidSafeArea}>
      <BackHeader />
      <Text
        style={[
          styleNoteEditor.noteTitle,
          { marginVertical: 20, marginHorizontal: 10 },
        ]}
      >
        Settings
      </Text>
      <Text style={styleConfig.subtitle}>Master Settings</Text>
      <View style={[styleConfig.sectionContainer, { zIndex: 9 }]}>
        <Text style={styleConfig.sectionText}>Date Format:</Text>
        <DatePicker />
      </View>
      <View style={[styleConfig.sectionContainer, { zIndex: -5 }]}>
        <Text style={styleConfig.sectionText}>Display save status:</Text>
        <SavedSwitch />
      </View>
      <Text style={styleConfig.subtitle}>Danger Zone</Text>
      <DeleteAllButton />
    </SafeAreaView>
  );
};

export default Settings;
