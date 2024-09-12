import { useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { schedulePushNotification } from "../hooks/notifications.hooks";

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
    <SafeAreaView>
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>
        Selected time:{" "}
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </Text>
    </SafeAreaView>
  );
};

export default TimeModal;
