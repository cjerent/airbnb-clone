import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const TextArea = ({ placeholder, setFunction, autoCorrect }) => {
  return (
    <TextInput
      style={styles.area}
      placeholder={placeholder}
      onChangeText={(text) => setFunction(text)}
      autoCorrect={autoCorrect ? true : false}
      multiline={true}
      numberOfLines={6}
    />
  );
};

export default TextArea;
const styles = StyleSheet.create({
  area: {
    height: 100,
    borderWidth: 1,
    borderColor: "#FF5B61",
    marginBottom: 10,
    fontSize: 15,
    borderRadius: 4,
    padding: 10,
  },
});
