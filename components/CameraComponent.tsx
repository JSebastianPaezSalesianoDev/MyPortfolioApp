// components/CameraComponent.tsx

import React, { useRef, useState } from "react";
import { View, Pressable, StyleSheet, Text, Alert } from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { save } from "../app/service/cameraService";

type CameraComponentProps = {
  onCapture: () => void;
  onClose: () => void;
};

const CameraComponent: React.FC<CameraComponentProps> = ({
  onCapture,
  onClose,
}) => {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<boolean>(false);
  const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleFacing = () =>
    setFacing((face) => (face === "back" ? "front" : "back"));

  const toggleFlash = () => setFlash((flash) => !flash);

  const takePicture = async () => {
    if (isTakingPicture) {
      console.log("Already taking a picture, ignoring request.");
      return;
    }

    const savedImage = await save("token", "base64", 100, 100);
    if (savedImage) {
      Alert.alert("Success", "Image saved locally!", [
        {
          text: "OK",
          onPress: () => {
            onCapture();
            onClose();
          },
        },
      ]);
      return;
    }

    setIsTakingPicture(true);
    setLoading(true);
    console.log("Taking picture...");
    try {
      const picture = await cameraRef.current?.takePictureAsync({
        base64: true,
        quality: 0.5,
      });

      if (!picture || !picture.base64) {
        throw new Error("No picture data received.");
      }

      console.log("Picture taken successfully:", picture);

      try {
        const timestamp = Date.now();
        await AsyncStorage.setItem(`localImage_${timestamp}`, picture.base64);
        console.log(`Image saved locally with key: localImage_${timestamp}`);

        Alert.alert("Success", "Image saved locally!", [
          {
            text: "OK",
            onPress: () => {
              onCapture();
              onClose();
            },
          },
        ]);
      } catch (error) {
        console.error("Error saving image to AsyncStorage:", error);
        Alert.alert("Error", "Failed to save image locally.");
      } finally {
        setIsTakingPicture(false);
        setLoading(false);
      }
    } catch (error: any) {
      setIsTakingPicture(false);
      setLoading(false);
      console.error("Error taking picture:", error);
      Alert.alert(
        "Error",
        error.message || "Ocurrió un error sacando una foto."
      );
    }
  };

  if (!permission) return <View />;
  if (!permission.granted)
    return (
      <Pressable onPress={requestPermission} style={styles.permissionRequest}>
        <Text style={styles.permissionText}>Permitir Cámara</Text>
      </Pressable>
    );

  return (
    <View style={styles.container}>
      <CameraView
        enableTorch={flash}
        style={styles.camera}
        facing={facing}
        mode="picture"
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <Pressable onPress={toggleFacing} style={styles.iconButton}>
            <Ionicons name="camera-reverse" size={32} color="white" />
          </Pressable>

          <Pressable
            onPress={isTakingPicture ? undefined : takePicture}
            style={styles.pictureButton}
            disabled={isTakingPicture}
          >
            <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
              📸
            </Text>
          </Pressable>

          <Pressable onPress={onClose} style={styles.iconButton}>
            <Ionicons name="close" size={32} color="white" />
          </Pressable>
        </View>
        {loading && (
          <View style={styles.loadingOverlay}>
            <Text>Loading...</Text>
          </View>
        )}
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
  iconButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
    padding: 15,
  },
  pictureButton: {
    backgroundColor: "white",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  permissionRequest: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    fontSize: 18,
    color: "blue",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraComponent;
