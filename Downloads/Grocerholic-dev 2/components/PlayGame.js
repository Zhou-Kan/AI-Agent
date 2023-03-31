import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../Firebase/firebase-setup";

export default function PlayGame({ navigation }) {
  const [list, setList] = useState([
    {
      title: "Apple",
      address: "Wasas,aas",
      image: "https://random.imagecdn.app/500/150",
      right: "A",
      items: [
        {
          title: "$0.99/1b",
          value: "A"
        },
        {
          title: "$0.58/1b",
          value: "B"
        },
        {
          title: "$03.29/1b",
          value: "C"
        }
      ]
    },
    {
      title: "IKSDJAL Fuji",
      address: "WSA",
      image: "https://random.imagecdn.app/500/150",
      right: "B",
      items: [
        {
          title: "$0.19/1b",
          value: "A"
        },
        {
          title: "$0.28/1b",
          value: "B"
        },
        {
          title: "$8.19/1b",
          value: "C"
        }
      ]
    },
    {
      title: "dasdsfa Fuji",
      address: "WSA",
      image: "https://random.imagecdn.app/500/150",
      right: "B",
      items: [
        {
          title: "$0.19/1b",
          value: "A"
        },
        {
          title: "$0.28/1b",
          value: "B"
        },
        {
          title: "$8.19/1b",
          value: "C"
        }
      ]
    },
    {
      title: "ofodapd",
      address: "WSA",
      image: "https://random.imagecdn.app/500/150",
      right: "B",
      items: [
        {
          title: "$0.19/1b",
          value: "A"
        },
        {
          title: "$0.28/1b",
          value: "B"
        },
        {
          title: "$8.19/1b",
          value: "C"
        }
      ]
    },
    {
      title: "ahdkjakdasasa ",
      address: "WSA",
      image: "https://random.imagecdn.app/500/150",
      right: "B",
      items: [
        {
          title: "$0.19/1b",
          value: "A"
        },
        {
          title: "$0.28/1b",
          value: "B"
        },
        {
          title: "$8.19/1b",
          value: "C"
        }
      ]
    },
    {
      title: "DJLADLAS",
      address: "WSA",
      image: "https://random.imagecdn.app/500/150",
      right: "B",
      items: [
        {
          title: "$0.19/1b",
          value: "A"
        },
        {
          title: "$0.28/1b",
          value: "B"
        },
        {
          title: "$8.19/1b",
          value: "C"
        }
      ]
    },
    {
      title: "Fuji",
      address: "WSA",
      image: "https://random.imagecdn.app/500/150",
      right: "B",
      items: [
        {
          title: "$0.19/1b",
          value: "A"
        },
        {
          title: "$0.28/1b",
          value: "B"
        },
        {
          title: "$8.19/1b",
          value: "C"
        }
      ]
    },
    {
      title: "DADASLDA",
      address: "WSA",
      image: "https://random.imagecdn.app/500/150",
      right: "B",
      items: [
        {
          title: "$0.19/1b",
          value: "A"
        },
        {
          title: "$0.28/1b",
          value: "B"
        },
        {
          title: "$8.19/1b",
          value: "C"
        }
      ]
    },
    {
      title: "DAJKDA",
      address: "WSA",
      image: "https://random.imagecdn.app/500/150",
      right: "B",
      items: [
        {
          title: "$0.19/1b",
          value: "A"
        },
        {
          title: "$0.28/1b",
          value: "B"
        },
        {
          title: "$8.19/1b",
          value: "C"
        }
      ]
    },
    {
      title: "IKSDJAL Fuji",
      address: "WSA",
      image: "https://random.imagecdn.app/500/150",
      right: "B",
      items: [
        {
          title: "$0.19/1b",
          value: "A"
        },
        {
          title: "$0.28/1b",
          value: "B"
        },
        {
          title: "$8.19/1b",
          value: "C"
        }
      ]
    },
  ]);
  const [now, setNow] = useState(list[0]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const next = () => {
    console.log("next////");
    // to next question
    let index = list.indexOf(now);
    if (index == list.length - 1) {
      setShowResult(true);
      return;
    }
    setShowAnswer(false);
    setNow(list[index + 1]);
  }
  const prev = () => {
    let index = list.indexOf(now);
    if (index == 0) {
      navigation.goBack();
      return;
    }
    setNow(list[index - 1]);

  }

  return (
    <View style={styles.container}>

      {!showResult ? <View style={{ alignItems: "center" }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 10, width: "100%" }}>
          <Button title="Back" onPress={() => {
            prev();
          }}></Button>
          <Text style={{ fontSize: 20 }}>{list.indexOf(now) + 1}/{list.length}</Text>
        </View>
        <View style={{ alignItems: "center" }} >
          <Image source={{ uri: now.image }} style={{ width: 200, height: 200 }}></Image>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }}>
              <Image source={require("../assets/tags.png")} style={{ width: 20, height: 20, marginRight: 10 }}></Image>
              <Text style={{ fontSize: 17 }}>{now.title}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={require("../assets/position.png")} style={{ width: 20, height: 20, marginRight: 10 }}></Image>
              <Text style={{ fontSize: 14, color: "#666" }}>{now.address}</Text>
            </View>
          </View>
          <View style={{ width: 300, marginTop: 10 }}>
            {now.items.map(item => <TouchableOpacity onPress={() => {
              // if (!now.yourAnswer) {
              now.yourAnswer = item.value;
              setList([...list]);
              setShowAnswer(true);
              // }

            }} style={{ borderColor: "#ddd", borderWidth: 1, padding: 10, margin: 10, flexDirection: "row", backgroundColor: now.yourAnswer == item.value ? "#6768ff" : "#fff" }}>
              <Text style={{ fontWeight: "bold", marginRight: 10, color: now.yourAnswer == item.value ? "#fff" : "#000" }}>{item.value}</Text>
              <Text style={{ color: now.yourAnswer == item.value ? "#fff" : "#000" }}>{item.title}</Text>
            </TouchableOpacity>)}
          </View>
        </View>
        {showAnswer ? <View style={{ alignItems: "center", backgroundColor: "#ffF687", padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>{now.yourAnswer != now.right ? 'the real price is' : 'your answer is right'} </Text>
          {now.yourAnswer != now.right ? <Text style={{ fontSize: 15, marginTop: 10 }}> {now.title}:{now.items.find(it => it.value === now.right).title} </Text> : <></>}



        </View> : <></>
        }

        <TouchableOpacity style={{ width: 100, backgroundColor: "#6576ff", justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 5, marginTop: 10 }} onPress={() => {
          next();
        }}>
          <Text style={{ color: "#fff" }} >Next</Text>
        </TouchableOpacity>

      </View> : <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} >
          <View style={{ marginTop: 10 }}>
            {list.filter(item => !!item.yourAnswer).map(item => <TouchableOpacity style={{ borderColor: "#ddd", borderWidth: 1, padding: 10, margin: 10, flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: "#7687ff", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>{item.right === item.yourAnswer ? "√" : "×"}</Text>
              </View>
              <Text style={{ fontWeight: "bold", marginRight: 10, marginLeft: 10 }}>Right:{item.items.find(it => it.value === item.right).title}</Text>
              <Text>Your Answer::{item.items.find(it => it.value === item.yourAnswer).title}</Text>
            </TouchableOpacity>)}
          </View>
        </ScrollView>
        <View style={{ alignItems: "center", backgroundColor: "#ffF687", padding: 10 }}>
          <Text style={{ fontSize: 15, marginTop: 10 }}>Your Score</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>{list.filter(item => item.right === item.yourAnswer).length} of {list.length}</Text>
          <TouchableOpacity onPress={() => {
            console.log("goBack////");
            navigation.goBack();
          }} style={{ width: 100, backgroundColor: "#6576ff", justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 5 }}>
            <Text style={{ color: "#fff" }} >Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",

  }
});