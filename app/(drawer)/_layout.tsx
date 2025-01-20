import { StyleSheet } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Drawer } from "expo-router/drawer";

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, marginTop: "-16%" }}>
      <Drawer
        screenOptions={{
          headerShown: true,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Bienvenido",
          }}
        />
        <Drawer.Screen
          name="profile/(tabs)"
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
        <Drawer.Screen
          name="dogs/index"
          options={{
            drawerLabel: "AboutDogs",
            title: "AboutDogs",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default _layout;
