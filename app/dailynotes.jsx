import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import {router} from "expo-router";

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
    keys.forEach(key => {
      newMarkedDates[key] = { selected: true, marked: true, selectedColor: 'blue' };
    });
    setMarkedDates(newMarkedDates);
  };

  // Check if the selected date is in the keys
  const isDateInKeys = (dateString) => {
    return keys.includes(dateString);
  };

  useEffect(() => {
    getAllKeys();
  }, []);

  return (
      <View>
        <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              router.push({ pathname: "/note", params: { title: day.dateString } })
            }}
            markedDates={markedDates}
        />
        {selectedDate && (
            <Text>
              {isDateInKeys(selectedDate)
                  ? `${selectedDate} is in keys`
                  : `${selectedDate} is not in keys`}
            </Text>
        )}
      </View>
  );
};

export default MyComponent;
