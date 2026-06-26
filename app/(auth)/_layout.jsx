import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

import GuestOnly from "../../components/auth/GuestOnly";
import { useUser } from "../../hooks/useUser";

const AuthLayout = () => {
  return (
    <GuestOnly>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      />
    </GuestOnly>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
