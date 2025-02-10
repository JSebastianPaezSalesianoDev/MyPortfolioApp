import React, { useRef, useState } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { saveImage } from "../app/service/cameraService";
import { getToken } from "../app/service/async-galeryStorage";
import { Ionicons } from "@expo/vector-icons";
import LoadingSpinner from "./LoadingSpinner";

type CameraProps = {
  onCapture: (base64Image: string) => void;
  onClose: () => void;
};

const CameraComponent = ({ onCapture, onClose }: CameraProps) => {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [loading, setLoading] = useState(false);

  if (!permission) return <View />;
  if (!permission.granted)
    return (
      <Pressable onPress={requestPermission} style={styles.permissionButton}>
        <Text style={styles.permissionText}>Permitir Cámara</Text>
      </Pressable>
    );

  const takePicture = async () => {
    if (!cameraRef.current) return;

    setLoading(true);
    try {
      const picture = await cameraRef.current.takePictureAsync({
        base64: true,
      });

      if (picture?.base64) {
        const token = await getToken();
        if (!token) {
          alert("No estás autenticado.");
          setLoading(false);
          return;
        }

        await saveImage(token, picture.base64, picture.width, picture.height);

        onCapture(`data:image/jpg;base64,${picture.base64}`);
      } else {
        alert("Error al tomar la foto");
      }
    } catch (error) {
      console.error("Error al capturar la imagen:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        mode="picture"
        ref={cameraRef}
      >
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
      </CameraView>

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
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 40,
  },
  iconButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  pictureButton: {
    backgroundColor: "white",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
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
