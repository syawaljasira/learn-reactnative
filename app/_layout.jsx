import { Platform, StyleSheet, Text, useColorScheme, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

import { UserProvider } from "../context/UserContext";
import { Colors } from "../constants/Colors";
import { BooksProvider } from "../context/BooksContext";

if (Platform.OS !== "web") {
  import("local-storage-fallback").then((storage) => {
    global.localStorage = storage.default;
  });
}

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <UserProvider>
      <BooksProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title,
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ title: "Home" }} />
        </Stack>
      </BooksProvider>
    </UserProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
