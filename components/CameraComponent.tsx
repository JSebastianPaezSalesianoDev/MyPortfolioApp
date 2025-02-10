// components/CameraComponent.tsx (Simplified - sin forwardRef ni useImperativeHandle)

import React, { useRef, useState, useCallback } from "react"; // Elimina forwardRef, useImperativeHandle de las imports
import { View, Pressable, StyleSheet, Text, Alert } from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoadingSpinner from "./LoadingSpinner";

type CameraComponentProps = {
  onCapture: (base64Image: string) => void;
  onClose: () => void;
};

const CameraComponent: React.FC<CameraComponentProps> = ({
  onCapture,
  onClose,
}) => {
  // Componente funcional simple, sin forwardRef
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [loading, setLoading] = useState<boolean>(false);

  if (!permission) return <View />;
  if (!permission.granted)
    return (
      <Pressable onPress={requestPermission} style={styles.permissionButton}>
        <Text style={styles.permissionText}>Permitir Cámara</Text>
      </Pressable>
    );

  const takePicture = useCallback(async () => {
    if (!cameraRef.current) return;

    setLoading(true);
    try {
      const picture = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5,
      });

      if (picture?.base64) {
        onCapture(picture.base64);
      } else {
        alert("Error al tomar la foto");
      }
    } catch (error) {
      console.error("Error al capturar la imagen:", error);
      Alert.alert("Error", "Error taking picture.");
    } finally {
      setLoading(false);
      onClose();
    }
  }, [onCapture, onClose]);

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        mode="picture"
        ref={cameraRef}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => setFacing(facing === "back" ? "front" : "back")}
          style={styles.iconButton}
        >
          <Ionicons name="camera-reverse" size={32} color="black" />
        </Pressable>

        <Pressable onPress={takePicture} style={styles.pictureButton}>
          <Text>📸</Text>
        </Pressable>

        <Pressable onPress={onClose} style={styles.iconButton}>
          <Ionicons name="close" size={32} color="black" />
        </Pressable>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <LoadingSpinner />
        </View>
      )}
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
  permissionButton: {
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
