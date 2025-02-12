// Galeria.tsx - Código FINAL y Completo

import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Modal,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../../../components/LoadingSpinner";
import CameraComponent from "../../../components/CameraComponent";
import { CameraView } from "expo-camera";

const { width } = Dimensions.get("window");

interface ImageItem {
  encodedData: string;
  timestamp: string;
}

const Galeria = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  const loadImages = useCallback(async () => {
    setLoading(true);
    try {
      const localImages: string[] = [];
      const keys = await AsyncStorage.getAllKeys();
      const imageKeys = keys.filter((key) => key.startsWith("localImage_"));

      if (imageKeys.length > 0) {
        const storedImages = await AsyncStorage.multiGet(imageKeys);
        storedImages.forEach(([_key, base64Data]) => {
          if (base64Data) {
            localImages.push(base64Data);
          }
        });
      }
      setImages(localImages);
    } catch (error) {
      console.error("Error loading local images:", error);
      Alert.alert("Error", "Failed to load images from local storage.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleImageCaptured = useCallback(async (base64Image: string) => {
    try {
      const timestamp = Date.now();
      await AsyncStorage.setItem(`localImage_${timestamp}`, base64Image);
      setImages((prevImages) => [...prevImages, base64Image]);
      setShowCamera(false);
    } catch (error) {
      console.error("Error saving image locally:", error);
      Alert.alert("Error", "Failed to save image locally.");
    }
  }, []);

  const handleDeleteImage = async (base64ImageToDelete: string) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro de que quieres eliminar esta imagen?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            setLoading(true);
            try {
              const keys = await AsyncStorage.getAllKeys();
              for (const key of keys) {
                if (key.startsWith("localImage_")) {
                  const storedImage = await AsyncStorage.getItem(key);
                  if (storedImage === base64ImageToDelete) {
                    await AsyncStorage.removeItem(key);
                    break;
                  }
                }
              }
              setImages((prev) =>
                prev.filter((img) => img !== base64ImageToDelete)
              );
            } catch (error) {
              console.error("Error deleting image:", error);
              Alert.alert("Error", "Failed to delete image.");
            } finally {
              setLoading(false);
              setSelectedImage(null);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <>
      <Pressable
        style={styles.openCameraButton}
        onPress={() => setShowCamera(true)}
      >
        <Text style={styles.openCameraButtonText}>Abrir cámara</Text>
      </Pressable>
      {showCamera ? (
        <CameraComponent
          onCapture={handleImageCaptured}
          onClose={() => setShowCamera(false)}
        />
      ) : (
        <View>
          <Text>Nada para mostrar</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "blue",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: Dimensions.get("window").width / 3 - 10,
    height: Dimensions.get("window").width / 3 - 10,
    margin: 5,
  },
  openCameraButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  openCameraButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalImage: {
    // width: "100%",
    // height: "80%",
    resizeMode: "contain",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  cameraComponentContainer: {
    flex: 1,
    flexGrow: 1,
    height: "100%",

    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  noImagesText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});

export default Galeria;
