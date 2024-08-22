import { useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { schedulePushNotification } from "../hooks/notifications.hooks";

const TimeModal = () => {
  const [time, setTime] = useState(new Date());
  const [timeDifference, setTimeDifference] = useState(null);

  const onChange = (event, selectedTime) => {
    if (selectedTime) {
      setTime(selectedTime);

      // Calculate the difference in minutes between the current time and the selected time
      const currentTime = new Date();
      let difference =
        (selectedTime.getTime() - currentTime.getTime()) / 1000 / 60;
      difference = Math.round(difference);
      setTimeDifference(difference);
      console.log("timeDifference", timeDifference);
      if (timeDifference < 0) {
        setTimeDifference(timeDifference + 1440);
      }
      schedulePushNotification(timeDifference * 60);
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
      {timeDifference !== null && (
        <Text>Difference in minutes: {timeDifference} minutes</Text>
      )}
    </SafeAreaView>
  );
};

export default TimeModal;
