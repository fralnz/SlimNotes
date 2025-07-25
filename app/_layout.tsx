import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { NoteContextProvider } from "@/app/hooks/notes.hook";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Adamina-Regular": require("../assets/fonts/Adamina-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NoteContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Calendar" options={{ headerShown: false }} />
        <Stack.Screen name="NotesList" options={{ headerShown: false }} />
        <Stack.Screen name="Settings" options={{ headerShown: false }} />
      </Stack>
    </NoteContextProvider>
  );
}
