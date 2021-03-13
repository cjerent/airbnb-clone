import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Input = ({ placeholder, setFunction, securePassword, autoCorrect }) => {
  return (
    <TextInput
      style={styles.input}
      autoCapitalize="none"
      placeholder={placeholder}
      onChangeText={(text) => setFunction(text)}
      secureTextEntry={securePassword ? true : false}
      autoCorrect={autoCorrect ? true : false}
    />
  );
};

export default Input;
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#FF5B61",
    marginBottom: 10,
    fontSize: 15,
    padding: 10,
  },
});
