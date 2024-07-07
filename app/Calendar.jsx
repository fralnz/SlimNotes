import React, { useEffect, useState } from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Calendar, CalendarList} from "react-native-calendars";
import { router } from "expo-router";
import styleAndroid from "./style/styleAndroid";
import BackIcon from "./components/icons/BackIcon";
import styleHeader from "./style/styleHeader";

const CalendarHeader = () => (
  <View style={styleHeader.header}>
    <Pressable
      onPress={() => {
        router.push("/");
      }}
    >
      <BackIcon width={32} height={32} />
    </Pressable>
  </View>
);

const CalendarNotes = () => {
  const [keys, setKeys] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to get all keys from AsyncStorage
  const getAllKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      setKeys(keys);
      markDates(keys);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to mark dates
  const markDates = (keys) => {
    const newMarkedDates = {};
    keys.forEach((key) => {
      newMarkedDates[key] = {
        selected: true,
        marked: true,
        selectedColor: "lightblue",
      };
    });
    setMarkedDates(newMarkedDates);
  };

  useEffect(() => {
    getAllKeys();
  }, []);

  return (
    <SafeAreaView style={styleAndroid.droidSafeArea}>
      <CalendarHeader />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <CalendarList
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            router.push({
              pathname: "/",
              params: { key: day.dateString },
            });
          }}
          markedDates={markedDates}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarNotes;
