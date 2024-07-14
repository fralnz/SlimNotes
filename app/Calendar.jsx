import React, { useEffect, useState, useCallback } from "react";
import { View, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CalendarList } from "react-native-calendars";
import { router } from "expo-router";
import styleAndroid from "./style/styleAndroid";
import BackHeader from "./components/BackHeader";

const CalendarNotes = () => {
  const [keys, setKeys] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const getAllKeys = useCallback(async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      setKeys(keys);
      markDates(keys);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const markDates = useCallback((keys) => {
    const newMarkedDates = keys.reduce((acc, key) => {
      acc[key] = {
        selected: true,
        marked: true,
        selectedColor: "#0070F2",
      };
      return acc;
    }, {});
    setMarkedDates(newMarkedDates);
  }, []);

  useEffect(() => {
    getAllKeys();
  }, [getAllKeys]);

  return (
    <SafeAreaView style={styleAndroid.droidSafeArea}>
      <BackHeader />
      <View style={styles.calendarContainer}>
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

const styles = {
  calendarContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
};

export default CalendarNotes;
