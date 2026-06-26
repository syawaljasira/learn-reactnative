import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

import { UserProvider } from "../context/UserContext";
import { Colors } from "../constants/Colors";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <UserProvider>
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
    </UserProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
