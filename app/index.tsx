import React, { useState, useEffect } from "react";
import { Button, TextInput, View, Text } from "react-native";
import { ThemeContext } from "react-native-elements";
import EditNote from "./components/EditNote";
import { storeData } from "@/app/utils/storageTools";

const HomeScreen = () => {
  const [value, setValue] = useState(null);
  return (
    <View>
      <ThemeContext.Provider value={value}>
        <EditNote />
      </ThemeContext.Provider>
    </View>
  );
};

export default HomeScreen;
