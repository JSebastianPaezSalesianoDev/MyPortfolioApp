import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { getAllImages, ImageItem } from "../../service/cameraService";
import { getToken } from "../../service/async-galeryStorage";

const { width } = Dimensions.get("window");

const Galeria = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar las imágenes
  const loadImages = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "No user token found. Please log in.");
        return;
      }

      const data = await getAllImages();
      if (data) {
        setImages(data);
      } else {
        Alert.alert("Error", "Failed to load images.");
      }
    } catch (error) {
      console.error("Error loading images:", error);
      Alert.alert("Error", "An error occurred while loading images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Botón para abrir la cámara */}
      <TouchableOpacity
        onPress={() => router.navigate("../../camera")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>

      {/* Mostrar mensaje si no hay imágenes */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : images.length === 0 ? (
        <Text style={styles.noImagesText}>No images found.</Text>
      ) : (
        // Mostrar las imágenes en un FlatList
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.encodedData }}
              style={{ width: width * 0.9, height: 200, marginVertical: 10 }}
              resizeMode="cover"
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  noImagesText: {
    fontSize: 18,
    color: "#888",
    marginTop: 20,
  },
});

export default Galeria;
