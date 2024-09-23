import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { getData, storeData } from "@/app/hooks/storage.hooks";
import { useNoteContext } from "@/app/hooks/notes.hook";

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid

    if (Constants.easConfig?.projectId) {
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.easConfig.projectId, // you can hard code project id if you dont want to use expo Constants
        })
      ).data;
      console.log(token);
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
};

export const schedulePushNotification = async (hour, minute) => {
  const notificationId = await getData("@notificationid");
  await cancelNotification(notificationId);

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily note! 🖋️",
      body: "Remember to write your daily note!",
      data: { data: "goes here" },
    },
    trigger: {
      hour: hour, // Set the hour for the notification
      minute: minute, // Set the minute for the notification
      repeats: true, // Repeat daily
    },
  });

  console.log(`Notification scheduled for ${hour}:${minute} with ID:`, id);
  await storeData("@notificationid", id);
};

export const cancelNotification = async (id) => {
  if (id) {
    await Notifications.cancelScheduledNotificationAsync(id);
    console.log("Notification canceled with ID:", id);
  } else {
    console.log("No notification to cancel.");
  }
};

export const toggleEnableNotifications = async () => {
  const notificationId = await getData("@notificationid");
  const { notificationsEnabled } = useNoteContext();
  if (notificationsEnabled) {
    await cancelNotification(notificationId);
  } else {
    // save notification time
  }
};

export const disableAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.dismissAllNotificationsAsync();
  console.log("All notifications canceled and dismissed.");
};
