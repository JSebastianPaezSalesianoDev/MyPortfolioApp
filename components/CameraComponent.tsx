import React, { useRef, useState } from "react";
import { View, Pressable, StyleSheet, Text, Alert, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import cameraService from "../services/cameraService";

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

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const picture = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5,
      });

      if (picture?.base64) {
        onCapture(picture.base64);
        setCapturedImage(picture.uri);
        await cameraService.saveImage(
          picture.base64,
          picture.width,
          picture.height
        );
        console.log("Foto tomada y guardada muy exitosamente");
      } else {
        alert("Error al tomar la foto");
      }
    } catch (error) {
      console.error("Error al capturar o guardar la imagen:", error);
      Alert.alert("Error", "Error tomando o guardando la foto.");
    } finally {
      onClose();
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (!permission) {
    return (
      <View>
        <Text>Hola</Text>
      </View>
    );
  } else if (!permission.granted) {
    return (
      <>
        <Text>sin permisos</Text>
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
        onCameraReady={() => console.log("Cámara lista!")}
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
