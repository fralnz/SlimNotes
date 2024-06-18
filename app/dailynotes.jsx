import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import { router } from "expo-router";
import styles from "./style";

const MyComponent = () => {
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
    <View style={{ display: "flex", flexDirection: "column"}}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          router.push({ pathname: "/note", params: { title: day.dateString } });
        }}
        markedDates={markedDates}
        style={styles.calendar}
      />
    </View>
  );
};

export default MyComponent;
