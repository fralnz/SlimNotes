import CustomSwitch from "react-native-custom-switch-new";
import React from "react";

const NotesSwitch = ({setVisibleKeys, dateKeys, customKeys, setIsDate}) => {
  return (
    <CustomSwitch
      switchLeftText={"Custom Notes"}
      switchLeftTextStyle={{
        color: "white",
        fontSize: 16,
        fontWeight: "600",
      }}
      switchRightText={"Daily Notes"}
      switchRightTextStyle={{
        color: "black",
        fontSize: 16,
        fontWeight: "600",
      }}
      buttonWidth={40}
      switchWidth={200}
      buttonPadding={2}
      switchBackgroundColor={"#EAECEF"}
      onSwitchBackgroundColor={"#0070F2"}
      startOnLeft={true}
      onSwitchReverse={() => {
        setVisibleKeys(dateKeys);
        setIsDate(true);
      }}
      onSwitch={() => {
        setVisibleKeys(customKeys);
        setIsDate(false);
      }}
    />
  );
};

export default NotesSwitch;
