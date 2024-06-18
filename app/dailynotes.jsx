import { Calendar } from "react-native-calendars";
import { View } from "react-native";
import React from "react";
import { router } from "expo-router";

const Dailynotes = () => {
  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          console.log("selected day", day);
          router.push({ pathname: "/note", params: { title: day.dateString } });
        }}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          height: 350,
        }}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e",
        }}
      />
    </View>
  );
};

export default Dailynotes;
