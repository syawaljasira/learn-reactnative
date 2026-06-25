import { StyleSheet, useColorScheme, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThemedView = ({ style, safe = false, ...otherProps }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  if (!safe)
    return (
      <View
        style={[
          {
            backgroundColor: theme.background,
          },
          style,
        ]}
        {...otherProps}
      />
    );

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottoms,
        },
        style,
      ]}
      {...otherProps}
    />
  );
};

export default ThemedView;

const styles = StyleSheet.create({});
