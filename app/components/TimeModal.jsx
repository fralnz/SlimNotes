import React, { useState } from "react";
import { Button, Pressable, SafeAreaView, Text, View } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { schedulePushNotification } from "../hooks/notifications.hooks";
import styleConfig from "../style/styleConfig";

const TimeModal = () => {
  const [time, setTime] = useState(new Date());

  const onChange = (event, selectedTime) => {
    if (selectedTime) {
      setTime(selectedTime);
      const selectedHour = selectedTime.getHours();
      const selectedMinute = selectedTime.getMinutes();
      console.log(`Selected time: ${selectedHour}:${selectedMinute}`);
      schedulePushNotification(selectedHour, selectedMinute);
    }
  };

  const showTimepicker = () => {
    DateTimePickerAndroid.open({
      value: time,
      onChange,
      mode: "time",
      is24Hour: true,
    });
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Pressable
        onPress={showTimepicker}
        title="Show time picker!"
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text style={styleConfig.sectionText}>Schedule notifications:</Text>
        <Text style={[styleConfig.sectionText, { alignSelf: "flex-end" }]}>
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </Pressable>
    </View>
  );
};

export default TimeModal;
