import { View, Text } from "react-native";
import React, { useEffect } from "react";
import PressableButton from "./PressableButton";
import { Ionicons } from "@expo/vector-icons";
import GoalUsers from "./GoalUsers";

export default function GoalDetails({ route, navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.goalItem.text,
      headerRight: () => {
        return (
          <PressableButton
            customizedStyle={{ backgroundColor: "#a5a" }}
            buttonPressed={() => {
              console.log("icon pressed from Goal Details");
            }}
          >
            <Ionicons name="warning" size={30} color="#eee" />
          </PressableButton>
        );
      },
    });
  });

  return (
    <View>
      <Text>
        You are viewing {route.params.goalItem.text} goal with id
        {route.params.goalItem.id}
      </Text>
      <GoalUsers />
    </View>
  );
}
