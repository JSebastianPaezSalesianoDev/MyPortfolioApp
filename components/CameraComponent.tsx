import React, { useRef, useState } from "react";
import { View, Pressable, StyleSheet, Text, Button, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import cameraService from "../services/cameraService";
import asyncStorageGaleryService from "../services/async-galeryStorage";
import { router } from "expo-router";

type CameraComponentProps = {
  onCapture: (base64Image: string) => void;
  onClose: () => void;
};

const CameraComponent: React.FC<CameraComponentProps> = ({
  onCapture,
  onClose,
}) => {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

  const takePicture = async () => {
    console.log("Taking pikture...");

    const image = await cameraRef.current?.takePictureAsync({ base64: true });

    if (image != null && image.base64 != null) {
      console.log("imagen es base 64 y entro al if del llamado al service");

      await cameraService.savePicture(image.height, image.width, image.base64);
      router.navigate("../galery");
      setCapturedImage(image.base64);
      console.log("Image saved!");
    } else {
      setCapturedImage(null);
      console.log("Error tomand la foto, null");
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (!permission) {
    return <View />;
  } else if (!permission.granted) {
    return (
      <Button onPress={requestPermission} title="Dar permisos de cámara" />
    );
  } else if (!permission.granted) {
    return (
      <>
        <Text>Sin permisos</Text>
        <Pressable onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionText}>Permitir Cámara</Text>
        </Pressable>
      </>
    );
  }

  return (
    <>
      <CameraView
        style={styles.camera}
        facing={facing}
        mode="picture"
        ref={cameraRef}
        onCameraReady={() => {
          console.log("Cámara lista!");
          setCameraReady(true);
        }}
      >
        <View style={styles.buttonContainer}>
          <Pressable onPress={onClose} style={styles.iconButton}>
            <Text style={styles.pictureButtonText}>🔙</Text>
          </Pressable>
          <Pressable onPress={takePicture} style={styles.pictureButton}>
            <Text style={styles.pictureButtonText}>📸</Text>
          </Pressable>
          <Pressable onPress={toggleCameraFacing} style={styles.iconButton}>
            <Text style={styles.pictureButtonText}>🔄</Text>
          </Pressable>
        </View>
        {capturedImage && (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: capturedImage }}
              style={styles.previewImage}
            />
          </View>
        )}
      </CameraView>
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    backgroundColor: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  pictureButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  permissionButton: {},
  permissionText: {
    fontSize: 18,
    color: "blue",
  },
  previewContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
});

export default CameraComponent;
