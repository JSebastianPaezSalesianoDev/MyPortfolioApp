import {
  View,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

const galery = () => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => router.navigate("../../camera")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

export default galery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 10,
  },
  buttonText: {},
});
