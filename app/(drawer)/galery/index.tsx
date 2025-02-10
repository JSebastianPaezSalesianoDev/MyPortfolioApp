// Galeria.tsx

import React, { useEffect, useState, useCallback } from "react";
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
import { router, useNavigation } from "expo-router";
import { getAllImages, ImageItem } from "../../service/cameraService";
import { getToken } from "../../service/async-galeryStorage";

const { width } = Dimensions.get("window");

const Galeria = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadImages = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken();
      console.log("Token recuperado en Galeria:", token);
      if (!token) {
        Alert.alert("Error", "No user token found. Please log in.");
        setLoading(false);
        return;
      }

      console.log("Fetching images from API...");
      const fetchedImages = await getAllImages(token);
      console.log("Images fetched:", fetchedImages);

      if (fetchedImages) {
        setImages(fetchedImages);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Error loading images:", error);
      Alert.alert("Error", "An error occurred while loading images.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.navigate("../../camera")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Abrir cámara</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : images.length === 0 ? (
        <Text style={styles.noImagesText}>No se encontraron imágenes.</Text>
      ) : (
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
