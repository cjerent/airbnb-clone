import React from "react";
import { Image, StyleSheet } from "react-native";

function HeaderLogo() {
  return <Image source={require("../assets/logo.png")} style={styles.logo} />;
}

export default HeaderLogo;

const styles = StyleSheet.create({
  logo: {
    height: 60,
    width: 60,
  },
});
