import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase-setup";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred);
    } catch (err) {
      console.log("login error", err);
    }
  };
  const signupHandlder = () => {
    navigation.replace("Signup");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={(newEmail) => {
          setEmail(newEmail);
        }}
        placeholder="Email"
        style={styles.input}
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
      <Button title="Login" onPress={loginHandler} />
      <Button title="Sign up" onPress={signupHandlder} />
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
