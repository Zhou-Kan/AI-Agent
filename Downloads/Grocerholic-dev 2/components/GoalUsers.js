import { View, FlatList, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";

export default function GoalUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          //an http error happened
          throw new Error("HTTP error happened");
        }
        // the fetch was sucessful
        const data = await response.json();
        // use data array to make a new array with just users' names
        const userNames = data.map((user) => {
          return user.name;
        });
        //update users state variable with the array of users' names
        setUsers(userNames); // this is asynchrnous
        // console.log(users);
      } catch (err) {
        console.log("get users error ", err);
      }
    }
    getUsers();
  }, []);

  async function addUser() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "Neda" }),
        }
      );
      if (!response.ok) {
        //an http error happened
        throw new Error("HTTP error happened");
      }
      // the fetch was sucessful
      const newUser = await response.json();
      console.log(newUser);
      //update the users array with this new data
      setUsers((prevUsers) => {
        return [...prevUsers, newUser.name];
      });
    } catch (err) {
      console.log("get users error ", err);
    }
  }
  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          //   console.log(item);
          return <Text>{item}</Text>;
        }}
      />
      <Button title="Add me as a user" onPress={addUser} />
    </View>
  );
}
