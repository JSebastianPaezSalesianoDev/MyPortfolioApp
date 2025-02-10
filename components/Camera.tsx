// Camera.tsx

import { StyleSheet, View, Button } from "react-native";
import React, { useState, useCallback } from "react";
import { router } from "expo-router";
import CameraComponent from "../components/CameraComponent";

const Camera = () => {
  const [showCamera, setShowCamera] = useState(true);
  const [refreshGallery, setRefreshGallery] = useState(false);

  const handleCaptureSuccess = useCallback(() => {
    setRefreshGallery((prevState) => !prevState);
  }, []);

  const handleCloseCamera = () => {
    setShowCamera(false);
    router.back();
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <CameraComponent
          onCapture={handleCaptureSuccess}
          onClose={handleCloseCamera}
        />
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Open Camera" onPress={() => setShowCamera(true)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Camera;
