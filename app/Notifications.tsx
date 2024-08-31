import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "@/app/hooks/notifications.hooks";
import { useEffect } from "react";

// Initialize the notification service
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      {/* Test button to schedule notifications */}
      <Button
        title="Send Notification"
        onPress={async () => {
          await schedulePushNotification(0);
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
