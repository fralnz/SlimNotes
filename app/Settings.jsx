import { Pressable, SafeAreaView, Text, View } from "react-native";
import styleAndroid from "./style/styleAndroid";
import styleNoteEditor from "./style/styleNoteEditor";
import React, { useEffect, useState } from "react";
import styleConfig from "./style/styleConfig";
import BackHeader from "./components/BackHeader";
import {
  DatePicker,
  NotificationsSwitch,
  SavedSwitch,
} from "./components/SettingsComponents";
import DeleteAllButton from "./components/DeleteAllButton";
import { router } from "expo-router";
import TimeModal from "./components/TimeModal";
import { useNoteContext } from "./hooks/notes.hook";
import { registerForPushNotificationsAsync } from "./hooks/notifications.hooks";

const Settings = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const { notificationsEnabled } = useNoteContext();
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
      <Text style={styleConfig.subtitle}>Notifications</Text>
      <View style={[styleConfig.sectionContainer, { zIndex: -5 }]}>
        <Text style={styleConfig.sectionText}>Enable notifications:</Text>
        <NotificationsSwitch />
      </View>
      {notificationsEnabled && (
        <View style={[styleConfig.sectionContainer, { zIndex: -5 }]}>
          <TimeModal />
        </View>
      )}
      <Text style={styleConfig.subtitle}>Danger Zone</Text>
      <DeleteAllButton />
    </SafeAreaView>
  );
};

export default Settings;
