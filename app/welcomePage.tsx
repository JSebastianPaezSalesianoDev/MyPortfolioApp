import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Page() {
  const image = require("../assets/adf7ff14688846eb90770d4a284676fa.jpg");

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.spacer}></View>
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomingRow}>
            <Text style={styles.welcomeText}>Welcome to my page!</Text>
            <View>
              <FontAwesome
                name="window-minimize"
                size={24}
                color="white"
                style={styles.windowMinimize}
              />
            </View>
            <View>
              <FontAwesome
                name="window-close-o"
                size={24}
                color="white"
                style={styles.windowClose}
              />
            </View>
          </View>
          <View style={styles.pressmeBox}>
            <View style={styles.welcomeView}>
              <Link href="./profile">
                <AntDesign name="caretright" size={15} color="black" />
                Press me!!<Text> </Text>
                <AntDesign name="caretleft" size={15} color="black" />
              </Link>
            </View>
          </View>
        </View>
        <View style={styles.spacer}></View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: "black",
    padding: 1,
    paddingTop: 1,
    height: 300,
    width: 300,
    borderRadius: 5,
  },
  welcomingRow: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  welcomeText: {
    color: "white",
    marginLeft: 10,
  },
  welcomeView: {
    backgroundColor: "#FFF",
    padding: 2,
    marginTop: 20,
    width: "45%",
  },
  windowMinimize: {
    marginRight: 9,
    marginTop: -7,
    marginLeft: 60,
  },
  windowClose: {
    marginRight: 8,
  },
  pressmeBox: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
});