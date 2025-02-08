import { Image, StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import Camera from "../../components/Camera";

const MyPicturesPage = () => {
  const [lastPicture, setLastPicture] = useState<string>("");

  return (
    <View style={styles.pageContainer}>
      <View style={styles.lastImageContainer}>
        {lastPicture == "" ? null : (
          <Image
            style={styles.lastImage}
            source={{ uri: `data:image/jpg;base64,${lastPicture}` }}
          />
        )}
      </View>
      <Camera setLastPicture={setLastPicture} />
    </View>
  );
};

export default MyPicturesPage;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    height: "100%",
  },
  lastImageContainer: {
    width: 55,
    height: 55,
    position: "absolute",
    zIndex: 2,
    top: 0,
    margin: 8,
    backgroundColor: "lightgray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lastImage: {
    width: 48,
    height: 48,
  },
});
