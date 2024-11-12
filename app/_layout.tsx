import { Link, Stack } from "expo-router";
import { Text, StyleSheet, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        header: () => (
          <View style={styles.headerContainer}>
            <Link href="/">
              <Text style={styles.headerText}>My Home</Text>
              <Entypo name="home" size={30} />
            </Link>
          </View>
        ),
      }}
    >
      <Stack.Screen name="./(tabs)" />
    </Stack>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#d3d3d3",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingTop: 10,
  },
  headerText: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default _layout;
