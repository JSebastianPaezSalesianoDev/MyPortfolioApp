import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";

import Card from "../../../components/CardComponent";
import { infocard } from "../../../data/CardData";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        header: () => (
          <Card
            id={22}
            title={infocard.name}
            description={infocard.myInfo}
            imgSource={require("../../../assets/f1.jpg")}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="aboutme"
        options={{
          title: "aboutme",
          tabBarIcon: () => <Fontisto name="person" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="repository"
        options={{
          title: "repository",
          tabBarIcon: () => <Fontisto name="qrcode" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
};
