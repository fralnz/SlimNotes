import React from "react";
import { SafeAreaView } from "react-native";
import EditNote from "./components/EditNote";
import styleAndroid from "@/app/style/styleAndroid";
import Toast from "react-native-toast-message";
import ToastConfig from "@/app/utils/Toast";
import useBackHandler from "@/app/hooks/useBackHandler";

const HomeScreen = () => {
  useBackHandler();

  return (
    <SafeAreaView style={styleAndroid.droidSafeArea}>
      <ToastConfig />
      <Toast />
      <EditNote />
    </SafeAreaView>
  );
};

export default HomeScreen;
