import { StyleSheet } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Drawer } from "expo-router/drawer";

const _layout = () => {
  return (
    /*  <Stack
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
      <Stack.Screen name="/profile/(tabs)" />
    </Stack> */

    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Bienvenido",
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Portfolio",
            title: "Portfolio",
          }}
        />
        <Drawer.Screen
          name="store/index"
          options={{
            drawerLabel: "Mi compra",
            title: "Mi compra",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
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
