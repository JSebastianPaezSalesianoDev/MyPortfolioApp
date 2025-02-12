import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Alert,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CameraComponent from "../../../components/CameraComponent";
import PictureService from "../../../services/cameraService";
import { Picture } from "../../../types/Picture";

const Galeria = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [images, setImages] = useState<Picture[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        const allImages = await PictureService.getAllPictures();

        if (Array.isArray(allImages)) {
          setImages(allImages);
          console.log("Imágenes cargadas correctamente:", allImages.length);
        } else {
          console.error("Datos de imágenes inválidos:", allImages);
          setImages([]);
          Alert.alert(
            "Error",
            "No se pudieron cargar las imágenes correctamente."
          );
        }
      } catch (error) {
        console.error("Error al cargar imágenes:", error);
        setImages([]);
        Alert.alert("Error", "Error al cargar las imágenes del servidor.");
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const openImage = (image: Picture) => {
    console.log("Image opened");
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const handleImageCaptured = useCallback(async (base64Image: string) => {
    try {
      const timestamp = Date.now();
      const newImage: Picture = {
        id: timestamp,
        height: 0,
        width: 0,
        encondedData: base64Image,
      };

      const savedImage = await PictureService.savePicture(
        newImage.height,
        newImage.width,
        base64Image
      );

      if (savedImage) {
        setImages((prevImages) => [...prevImages, newImage]);
      } else {
        throw new Error("No se pudo guardar la imagen en el servidor");
      }

      setShowCamera(false);
    } catch (error) {
      console.error("Error al guardar la imagen:", error);
      Alert.alert("Error", "No se pudo guardar la imagen.");
    }
  }, []);

  return (
    <View style={styles.container}>
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
        <View style={styles.galleryContainer}>
          {loading ? (
            <Text style={styles.statusText}>Cargando imágenes...</Text>
          ) : images.length === 0 ? (
            <Text style={styles.statusText}>No hay imágenes para mostrar</Text>
          ) : (
            <>
              <Text style={styles.title}>Imágenes:</Text>
              <FlatList
                data={images}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                renderItem={({ item }) => (
                  <Pressable onPress={() => openImage(item)}>
                    <Image
                      source={{
                        uri: `data:image/jpg;base64,${item.encondedData}`,
                      }}
                      style={styles.thumbnail}
                    />
                  </Pressable>
                )}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  galleryContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
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
  statusText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});

export default Galeria;
