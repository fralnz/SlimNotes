import { Calendar } from "react-native-calendars";
import { View } from "react-native";
import React from "react";

const Dailynotes = () => {
  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
      />
    </View>
  );
};

export default Dailynotes;
