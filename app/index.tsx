import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, BackHandler, ToastAndroid } from "react-native";
import EditNote from "./components/EditNote";
import { useLocalSearchParams } from "expo-router";
import AppHeader from "@/app/components/AppHeader";
import styleAndroid from "@/app/style/styleAndroid";
import { getCurrentDate, dateToString } from "@/app/utils/dateTools";
import Toast from 'react-native-toast-message';
import ToastConfig from "@/app/utils/Toast";

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
      dateToString(getCurrentDate()),
  ); // Initialize with current date
  const params = useLocalSearchParams(); // Use useLocalSearchParams to get the params
  const key = Array.isArray(params.key) ? params.key[0] : params.key; // Handle the case where key might be an array

  const backPressCounter = useRef(0);

  useEffect(() => {
    if (key) {
      setSelectedDate(key);
    }
  }, [key]);

  useEffect(() => {
    const backAction = () => {
      if (backPressCounter.current === 0) {
        backPressCounter.current += 1;
        Toast.show({
          type: 'info',
          text1: 'Press back again to exit',
          position: 'bottom',
          visibilityTime: 2000,
        });
        setTimeout(() => {
          backPressCounter.current = 0;
        }, 2000);
        return true;
      } else if (backPressCounter.current === 1) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
      <SafeAreaView style={styleAndroid.droidSafeArea}>
        <ToastConfig />
        <Toast />
        <AppHeader />
        <EditNote noteKey={selectedDate} />
      </SafeAreaView>
  );
};

export default HomeScreen;
