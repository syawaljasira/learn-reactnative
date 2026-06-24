import { View } from "react-native";

const Spacer = ({ width = "100%", height = 40, ...otherProps }) => {
  return <View style={{ width, height }} {...otherProps} />;
};

export default Spacer;
