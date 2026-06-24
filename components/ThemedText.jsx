import { Text, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedText = ({ style, title = false, ...otherProps }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const textColor = title ? theme.title : theme.text;

  return <Text style={[{ color: textColor }, style]} {...otherProps} />;
};

export default ThemedText;
