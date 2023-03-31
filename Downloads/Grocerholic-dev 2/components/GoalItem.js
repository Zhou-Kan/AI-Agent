import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import { Ionicons } from "@expo/vector-icons";

export default function GoalItem({ goal, onDelete, onGoalPress }) {
  function goalPressed() {
    onDelete(goal.id);
  }
  return (
    <View>
      <Pressable
        style={({ pressed }) => {
          return [styles.textContainer, pressed && styles.pressedStyle];
          // return pressed ? styles.pressedStyle : null;
          // if (pressed)
          // {
          //   return styles.pressedStyle
          // }
        }}
        android_ripple={{ color: "red" }}
        onPress={() => onGoalPress(goal)}
      >
        <Text style={styles.text}>{goal.text}</Text>
        {/* <Button
          title="X"
          onPress={() => {
            onDelete(goal.id);
          }}
          color="black"
        /> */}
        <PressableButton
          customizedStyle={styles.deleteButton}
          pressedStyle={styles.pressedStyle}
          buttonPressed={goalPressed}
        >
          <Ionicons name="trash" size={30} color="black" />
          {/* <Text>X</Text> */}
        </PressableButton>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "purple",
    padding: 15,
  },
  textContainer: {
    backgroundColor: "#999",
    borderRadius: 5,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pressedStyle: {
    backgroundColor: "#e9e",
    opacity: 0.5,
  },
  deleteButton: {
    paddingHorizontal: 5,
    backgroundColor: "#aaa",
  },
});
