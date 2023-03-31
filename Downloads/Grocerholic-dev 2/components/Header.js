import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Platform,
} from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Header({ appName }) {
  const { height, width } = useWindowDimensions();
  console.log(width);
  const paddingVerticalDynamic = width < 380 ? 5 : 0;
  const marginVerticalDynamic = width < 380 ? 0 : 5;
  return (
    <View>
      <Text
        style={[
          styles.header,
          {
            paddingVertical: paddingVerticalDynamic,
            marginVertical: marginVerticalDynamic,
          },
        ]}
      >
        Welcome to {appName}
      </Text>
    </View>
  );
}
//static styling
const styles = StyleSheet.create({
  header: {
    color: "purple",
    // borderWidth: Platform.OS === "ios" ? 2 : 4,
    borderWidth: Platform.select({ ios: 2, android: 4 }),
    borderColor: "rebeccapurple",
    fontSize: windowWidth < 380 ? 20 : 24,
    padding: 5,
    paddingHorizontal: windowWidth < 380 ? 10 : 20,
    width: 350,
    textAlign: "center",
    maxWidth: "90%",
  },
});
