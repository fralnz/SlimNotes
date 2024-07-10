import { Pressable, SafeAreaView, Text, View } from "react-native";
import styleAndroid from "./style/styleAndroid";
import styleNoteEditor from "./style/styleNoteEditor";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { removeAll, storeData } from "./utils/storageTools";
import styleConfig from "./style/styleConfig";
import BackHeader from "./components/BackHeader";
import ToastConfig from "./utils/Toast";
import Toast from "react-native-toast-message";
import CustomSwitch from "react-native-custom-switch-new";
import { useNoteContext } from "./hooks/notes.hook";

const Settings = () => {
  const [dfopen, setDfopen] = useState(false);
  const [dfvalue, setDfvalue] = useState(null);
  const { savedEnabled, setSavedEnabled } = useNoteContext();
  const [dfitems, setDfitems] = useState([
    { label: "DD-MM-YYYY", value: "DD-MM-YYYY" },
    { label: "MM-DD-YYYY", value: "MM-DD-YYYY" },
    { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
  ]);

  const setDateFormat = async (value) => {
    setDfvalue(value);
    await storeData("@dateformat", value);
  };

  const storeSaveEnabled = async (value) => {
    await storeData("@savedenabled", value);
    setSavedEnabled(value);
  };

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
      <View style={styleConfig.sectionContainer}>
        <Text style={styleConfig.sectionText}>Date Format:</Text>
        <DropDownPicker
          open={dfopen}
          value={dfvalue}
          items={dfitems}
          setOpen={setDfopen}
          setValue={setDfvalue}
          setItems={setDfitems}
          placeholder={"Select date format"}
          onChangeValue={setDateFormat}
          containerStyle={{
            width: "50%",
          }}
        />
      </View>

      <CustomSwitch
        buttonWidth={40}
        switchWidth={200}
        buttonPadding={2}
        switchBackgroundColor={"#EAECEF"}
        onSwitchBackgroundColor={"#0070F2"}
        startOnLeft={savedEnabled}
        onSwitchReverse={() => {
          storeSaveEnabled(false);
        }}
        onSwitch={() => {
          storeSaveEnabled(true);
        }}
      />

      {JSON.stringify(savedEnabled)}

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
