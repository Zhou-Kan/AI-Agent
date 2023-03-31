import { View, Image, Button, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ imageUriHandler }) {
  const [imageUri, setImageUri] = useState("");
  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();

  // verify permission should return true or false

  async function verifyPermission() {
    if (permissionInfo.granted) {
      return true;
    }
    try {
      const permissionResult = await requestPermission();
      return permissionResult.granted;
    } catch (err) {
      console.log("permission requeest error ", err);
    }
  }
  async function imageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("You need to give access to the camera");
      return;
    }
    try {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        // setImageUri is async
        setImageUri(result.assets[0].uri);
        // pass the image uri back to Input.js
        imageUriHandler(result.assets[0].uri);
      }
    } catch (err) {
      console.log("launch camera error ", err);
    }
  }
  return (
    <View>
      <Button title="Take a Picture" onPress={imageHandler} />
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={{ width: 100, height: 100 }}
        />
      )}
    </View>
  );
}
