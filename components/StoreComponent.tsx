import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";

const StoreComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  return (
    <View style={styles.modalContainer}>
      <Button title="close" onPress={() => setIsModalVisible(false)}></Button>
    </View>
  );
};

export default StoreComponent;

const styles = StyleSheet.create({
  buttonAddProduct: {
    backgroundColor: "red",
    width: "50%",
  },
  modalContainer: {
    justifyContent: "center",
    alignSelf: "center",
    verticalAlign: "middle",
    backgroundColor: "purple",
    width: "50%",
    height: "50%",
  },
});
