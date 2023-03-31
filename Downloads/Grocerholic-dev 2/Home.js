import { StatusBar } from "expo-status-bar";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import GoalItem from "./components/GoalItem";
import Header from "./components/Header";
import GameInstructions from "./components/GameInstructions";
import { auth, firestore, storage } from "./Firebase/firebase-setup";
import { deleteFromDB, writeToDB } from "./Firebase/firestoreHelper";

export default function Home({ navigation }) {
  const playHandlder = () => {
    navigation.navigate("playGame");
  }
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "goals"),
        where("user", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setGoals([]);
        } else {
          let goalsFromDB = [];
          querySnapshot.docs.forEach((snapDoc) => {
            goalsFromDB.push({ ...snapDoc.data(), id: snapDoc.id });
          });
          console.log(goalsFromDB);
          setGoals(goalsFromDB);
        }
      },
      (error) => {
        console.log("snapshot error ", error);
      }
    );
    // this is a cleanup function that will be called automatically when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);
  const name = "Grocerholic";
  // const [enteredText, setEnteredText] = useState("Your goals will appear here");
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


  async function fetchImage(uri) {
    try {
      console.log(uri);
      const response = await fetch(uri);
      const imageBlob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = await ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log("image fetch error ", err);
    }
  }
  async function onTextEntered(dataFromInput) {
    let imageUri = "";
    if (dataFromInput.imageUri) {
      imageUri = await fetchImage(dataFromInput.imageUri);
    }
    // setEnteredText(changedText);
    // update goals array with the new text
    const newGoal = { text: dataFromInput.text, imageUri: imageUri };
    writeToDB(newGoal);

    // const newArray = [...goals, newGoal];
    // setGoals((prevGoals) => {
    //   return [...prevGoals, newGoal];
    // });
    setModalVisible(false);
  }

  function onCancel() {
    setModalVisible(false);
  }
  function onDeletePressed(deletedId) {
    // console.log("delete pressed ", deletedId);
    // let newArray = goals.filter((goal) => {
    //   return goal.id !== deletedId;
    // });
    // setGoals(newArray);
    // setGoals((prevGoals) => {
    //   return prevGoals.filter((goal) => {
    //     return goal.id !== deletedId;
    //   });
    // });
    deleteFromDB(deletedId);
  }
  function goalPressed(pressedGoal) {
    // console.log("pressed ", pressedId);
    navigation.navigate("GoalDetails", { goalItem: pressedGoal });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Header appName={name} />
        <Button
          title="Play A Game"
          onPress={() => {
            navigation.navigate("PlayGame", {});
            // setModalVisible(true);
            console.log("Play game")
          }}
        />
        <Button
          title="How to play"
          onPress={() => {
            setModalVisible(true);
            console.log("Instructions")
          }}
        />
        <Button
          title="View the list"
          onPress={() => {
            // setModalVisible(true);
            console.log("Grocery list")
          }}

        />
      </View>
      <GameInstructions
        modalIsVisible={modalVisible}
        cancelPressed={onCancel}
      />
      <View style={styles.bottomContainer}>
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={goals}
          renderItem={({ item }) => {
            return (
              <GoalItem
                goal={item}
                onDelete={onDeletePressed}
                onGoalPress={goalPressed}
              />
            );
            // console.log(item);
          }}
        />
        {/* <ScrollView
          // alwaysBounceVertical={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
          {goals.map((goal) => {
            return (
              <View key={goal.id} style={styles.textContainer}>
                <Text style={styles.text}>{goal.text}</Text>
              </View>
            );
          })}
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "#dcd",
    alignItems: "center",

    // alignSelf: "stretch",
  },
  scrollContentsStyle: {
    alignItems: "center",
  },
  text: {
    fontSize: 80,
    color: "purple",

    padding: 15,
  },
  textContainer: {
    backgroundColor: "#999",
    borderRadius: 5,
    marginBottom: 15,
  },
});
