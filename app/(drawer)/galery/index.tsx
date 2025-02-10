import {
  Animated,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import cameraService from "../../service/cameraService";
import LoadingSpinner from "../../../components/LoadingSpinner";

const { width, height } = Dimensions.get("window");

const index = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [userImages, setUserImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    const fetchUserImages = async () => {
      const images = await cameraService.getUserImages();
      setUserImages(images);
      setLoading(false);
    };

    fetchUserImages();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      if (photo != undefined) {
        await cameraService.saveImage(photo.base64!, photo.width, photo.height);
        setUserImages([photo.uri, ...userImages]);
      }
    }
    setIsCameraOpen(false);
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner />
      </View>
    );
  }

  const openImage = (image: string) => {
    console.log("Image opened");
    setSelectedImage(image);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeImage = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSelectedImage(null));
  };

  return (
    <View style={styles.container}>
      {userImages.length > 0 ? (
        <>
          <Text style={styles.title}>Imágenes:</Text>
          <FlatList
            data={userImages}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openImage(item)}>
                <Image source={{ uri: item }} style={styles.thumbnail} />
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <View>
          <Text style={(styles.title, { alignSelf: "center" })}>
            No hay imagenes
          </Text>
        </View>
      )}

      {/* Botón para abrir la cámara */}
      <TouchableOpacity style={styles.openCameraButton} onPress={openCamera}>
        <Ionicons name="camera" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal para la cámara */}
      <Modal visible={isCameraOpen} animationType="slide">
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.cameraButtons}>
              <TouchableOpacity
                style={styles.flipCameraButton}
                onPress={toggleCameraFacing}
              >
                <Ionicons name="camera-reverse" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={takePicture}
              >
                <Ionicons name="radio-button-on" size={50} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
          <TouchableOpacity style={styles.closeButton} onPress={closeCamera}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Vista de imagen a pantalla completa */}
      {selectedImage && (
        <View style={styles.fullscreenOverlay}>
          <TouchableOpacity style={styles.closeButton} onPress={closeImage}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <Animated.Image
            source={{ uri: selectedImage }}
            style={[
              styles.fullscreenImage,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          />
        </View>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    justifyContent: "space-between",
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  thumbnailContainer: {
    marginTop: 20,
    padding: 10,
  },
  thumbnailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  fullscreenOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: width * 0.9,
    height: height * 0.7,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    bottom: 20,
    zIndex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cameraButton: {
    bottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    marginHorizontal: 30,
    borderRadius: 50,
  },
  flipCameraButton: {
    bottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    paddingBottom: 0,
    height: "75%",
    marginHorizontal: 30,
    borderRadius: 50,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  cameraButtons: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 20,
    paddingHorizontal: 20,
  },
  openCameraButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    alignSelf: "center",
    borderRadius: 50,
  },
});
