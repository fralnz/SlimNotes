import { SafeAreaView, Text, View } from "react-native";
import styleAndroid from "./style/styleAndroid";
import styleNoteEditor from "./style/styleNoteEditor";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { getData, storeData } from "./utils/storageTools";
import styleConfig from "./style/styleConfig";

const Settings = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [ref, setRef] = useState(null);
  const [items, setItems] = useState([
    { label: "DD-MM-YYYY", value: "DD-MM-YYYY" },
    { label: "MM-DD-YYYY", value: "MM-DD-YYYY" },
    { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
  ]);

  const setDateFormat = async (value) => {
    setValue(value);
    await storeData("@dateformat", value);
    const answer = await getData("@dateformat");
    setRef(answer);
  };

  useEffect(() => {
    const fetch = async () => {
      const answer = await getData("@dateformat");
      setRef(answer);
    };
    fetch();
  }, []);

  return (
    <SafeAreaView style={styleAndroid.droidSafeArea}>
      <Text style={styleNoteEditor.noteTitle}>Settings</Text>
      <View style={styleConfig.sectionContainer}>
        <Text style={styleConfig.sectionText}>Date Format:</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={setDateFormat}
          containerStyle={{
            width: "50%",
          }}
        />
      </View>
      <Text>{ref}</Text>
    </SafeAreaView>
  );
};

export default Settings;
