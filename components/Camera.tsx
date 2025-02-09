import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { save } from "../app/service/cameraService";

type CameraProps = {
  setLastPicture: Function;
};

const Camera = ({ setLastPicture }: CameraProps) => {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<boolean>(false);

  const toggleFacing = () =>
    setFacing((face) => (face === "back" ? "front" : "back"));

  const toggleFlash = () => setFlash((flash) => !flash);

  const takePicture = async () => {
    console.log("taking picture...");
    const picture: any = await cameraRef.current?.takePictureAsync({
      base64: true,
    });
    const savedImage = await save(
      picture.height,
      picture.width,
      picture.base64
    );

    if (savedImage) {
      console.log("Image saved to API:", savedImage);
      setLastPicture(picture.base64);
      router.navigate("../../(drawer)/galery");
    } else {
      throw new Error("Failed to save image to API.");
    }
    if (picture != null && picture.base64 != null) {
      setLastPicture(picture.base64);
      router.navigate("../../(drawer)/galery");
    } else {
      alert("Ocurrió un error sacando una foto.");
    }
  };

  if (!permission) {
    return <View />;
  } else if (!permission.granted) {
    return (
      <Button onPress={requestPermission} title="Dar permisos de cámara" />
    );
  }

  return (
    <CameraView
      enableTorch={flash}
      style={styles.camera}
      facing={facing}
      mode="picture"
      ref={cameraRef}
      onCameraReady={() => console.log("Camera ready!")}
    >
      <Pressable
        style={styles.exitBoton}
        onPress={() => router.navigate("../../(drawer)/galery")}
      >
        <Text> Exit </Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.iconButton} onPress={toggleFlash}>
          <Ionicons
            name={flash ? "flash-off" : "flash"}
            size={32}
            color="black"
          />
        </Pressable>
        <Pressable style={styles.pictureButton} onPress={takePicture}>
          <Text> </Text>
        </Pressable>

        <Pressable style={styles.iconButton} onPress={toggleFacing}>
          <Ionicons name="camera-reverse" size={32} color="black" />
        </Pressable>
      </View>
    </CameraView>
  );
};

export default Camera;

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "flex-end",
    justifyContent: "space-between",
    margin: 40,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "50%",
    borderColor: "gray",
    borderWidth: 2,
    padding: 8,
  },
  pictureButton: {
    height: 80,
    width: 80,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "50%",
    borderColor: "gray",
    borderWidth: 6,
  },
  exitBoton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
});
