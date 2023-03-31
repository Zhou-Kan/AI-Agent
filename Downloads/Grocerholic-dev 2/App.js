import React, { useEffect, useState } from "react";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./components/GoalDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PlayGame from "./components/PlayGame";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase/firebase-setup";
import Profile from "./components/Profile";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

const Stack = createNativeStackNavigator();
const AuthStack = (
  <>
    <Stack.Screen name="Grocerholic" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="PlayGame" component={PlayGame} />
  </>
);

const AppStack = (
  <>
    <Stack.Screen
      options={({ navigation }) => {
        return {
          headerRight: () => {
            return (
              <Pressable
                onPress={() => {
                  console.log("profile");
                  navigation.navigate("Profile");
                }}
              >
                <Ionicons name="person" size={30} color="#eee" />
              </Pressable>
            );
          },
        };
      }}
      name="Home"
      component={Home}
    />
    <Stack.Screen name="PlayGame" component={PlayGame} />

    <Stack.Screen
      // options={({ route }) => {
      //   // console.log(data);
      //   return {
      //     // update the title using route
      //     title: route.params.goalItem.text,
      //   };
      // }}
      name="GoalDetails"
      component={GoalDetails}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerRight: () => {
          return (
            <Pressable
              onPress={async () => {
                try {
                  await signOut(auth);
                } catch (err) {
                  console.log("logout ", err);
                }
                // console.log("logout");
              }}
            >
              <Ionicons name="exit" size={30} color="#eee" />
            </Pressable>
          );
        },
      }}
    />
  </>
);
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); //when there is a valid user show app stack
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#a5a" },
          headerTintColor: "#eee",
          headerTitleStyle: { fontSize: 20 },
        }}
      >
        {isAuthenticated ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
