import React from "react";
import { Image, StyleSheet, View } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Ayomama Logo.png")}
        style={styles.image}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
