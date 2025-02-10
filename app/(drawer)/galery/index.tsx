import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { router } from "expo-router";
import {
  getAllImages,
  deleteImage,
  ImageItem,
} from "../../service/cameraService";
import { getToken } from "../../service/async-galeryStorage";

const Gallery = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const loadImages = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "No se encontró el token del usuario.");
        return;
      }
      const fetchedImages = await getAllImages(token);
      setImages(fetchedImages || []);
    } catch (error) {
      console.error("Error cargando imágenes:", error);
      Alert.alert("Error", "No se pudieron cargar las imágenes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleDelete = async (imageId: string) => {
    const token = await getToken();
    if (!token) return;

    try {
      await deleteImage(token, imageId);
      setImages(images.filter((img) => img.id !== imageId));
      setSelectedImage(null);
    } catch (error) {
      console.error("Error eliminando imagen:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.navigate("../camera")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Abrir Cámara</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : images.length === 0 ? (
        <Text style={styles.noImagesText}>No hay imágenes guardadas.</Text>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedImage(item)}>
              <Image
                source={{ uri: item.encodedData }}
                style={styles.thumbnail}
              />
            </TouchableOpacity>
          )}
        />
      )}

      {selectedImage && (
        <Modal visible={true} transparent={true}>
          <View style={styles.modalContainer}>
            <Image
              source={{ uri: selectedImage.encodedData }}
              style={styles.fullImage}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => handleDelete(selectedImage.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedImage(null)}
                style={styles.closeButton}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginRight: 20,
  },
  closeButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
});

export default Gallery;
