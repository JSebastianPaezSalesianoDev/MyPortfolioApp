import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import { Redirect } from "expo-router";

export const TodoPage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [toDoList, setToDoList] = useState<string[]>([]);
  //const addNewItem
  return (
    <View style={styles.container}>
      <ScrollView>
        {toDoList.map((item) => (
          <Text>{item}</Text>
        ))}
      </ScrollView>
      <Button
        title="abrir modal"
        onPress={() => setIsModalVisible(true)}
      ></Button>
      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <Text> Introduce una nueva tarea: </Text>
          <TextInput />
          <Button
            title="close"
            onPress={() => setIsModalVisible(false)}
          ></Button>
        </View>
      </Modal>
    </View>
  );
};

export default TodoPage;

const styles = StyleSheet.create({
  container: {
    width: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
