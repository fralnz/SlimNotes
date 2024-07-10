import React, { useState } from "react";
import { storeData } from "../utils/storageTools";
import DropDownPicker from "react-native-dropdown-picker";
import CustomSwitch from "react-native-custom-switch-new";
import { useNoteContext } from "../hooks/notes.hook";

export const DatePicker = () => {
  const [dfopen, setDfopen] = useState(false);
  const [dfvalue, setDfvalue] = useState(null);
  const [dfitems, setDfitems] = useState([
    { label: "DD-MM-YYYY", value: "DD-MM-YYYY" },
    { label: "MM-DD-YYYY", value: "MM-DD-YYYY" },
    { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
  ]);

  const setDateFormat = async (value) => {
    setDfvalue(value);
    await storeData("@dateformat", value);
  };
  return (
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
  );
};

export const SavedSwitch = () => {
  const { savedEnabled, setSavedEnabled } = useNoteContext();

  const storeSaveEnabled = async (value) => {
    await storeData("@savedenabled", value);
    setSavedEnabled(value);
  };

  return (
    <CustomSwitch
      buttonWidth={30}
      switchWidth={70}
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
  );
};
