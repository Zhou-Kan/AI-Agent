import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase-setup";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginHandler = () => {
    navigation.replace("Grocerholic");
  };
  const signupHandler = async () => {
    if (password !== confirmPassword) {
      //checking value and type {
      Alert.alert("The passwords don't match");
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCred);
    } catch (err) {
      console.log("sign up error ", err);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(newEmail) => {
          setEmail(newEmail);
        }}
        placeholder="Email"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(newPassword) => {
          setPassword(newPassword);
        }}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(newPassword) => {
          setConfirmPassword(newPassword);
        }}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already Registered? Login" onPress={loginHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "90%",
    margin: 10,
  },
  label: {
    margin: 10,
  },
});
