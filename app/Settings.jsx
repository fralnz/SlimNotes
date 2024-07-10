import { Pressable, SafeAreaView, Text, View } from "react-native";
import styleAndroid from "./style/styleAndroid";
import styleNoteEditor from "./style/styleNoteEditor";
import React from "react";
import { removeAll } from "./utils/storageTools";
import styleConfig from "./style/styleConfig";
import BackHeader from "./components/BackHeader";
import ToastConfig from "./utils/Toast";
import Toast from "react-native-toast-message";
import { DatePicker, SavedSwitch } from "./components/SettingsComponents";

const Settings = () => {
  return (
    <SafeAreaView style={styleAndroid.droidSafeArea}>
      <ToastConfig />
      <Toast />
      <BackHeader />
      <Text
        style={[
          styleNoteEditor.noteTitle,
          { marginVertical: 20, marginHorizontal: 10 },
        ]}
      >
        Settings
      </Text>
      <View style={[styleConfig.sectionContainer, { zIndex: 9 }]}>
        <Text style={styleConfig.sectionText}>Date Format:</Text>
        <DatePicker />
      </View>
      <View style={[styleConfig.sectionContainer, { zIndex: -5 }]}>
        <Text style={styleConfig.sectionText}>Display save status:</Text>
        <SavedSwitch />
      </View>

      <Pressable
        style={{ zIndex: -5 }}
        onPress={() => {
          removeAll();
        }}
      >
        <Text
          style={{
            backgroundColor: "#d6d6d6",
            fontSize: 16,
            color: "black",
            padding: 15,
            fontWeight: 600,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          Remove all Notes
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Settings;
