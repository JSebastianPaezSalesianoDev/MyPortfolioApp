// TestCameraComponent.tsx (Create a new file for testing)

import React, { useCallback } from "react";
import { View, Button } from "react-native";
import CameraComponent from "./CameraComponent";

const TestCameraComponent = () => {
  const handleCapture = useCallback((base64Image: string) => {
    console.log(
      "Image Captured (Test Component):",
      base64Image.substring(0, 50) + "..."
    );
  }, []);

  const handleClose = useCallback(() => {
    console.log("Camera Closed (Test Component)");
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <CameraComponent onCapture={handleCapture} onClose={handleClose} />
    </View>
  );
};

export default TestCameraComponent;
