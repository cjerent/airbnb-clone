import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Input from "../components/Input";
import TextArea from "../components/TextArea";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleValidateSignup = async () => {
    try {
      if (email && username && description && password && confirmPassword) {
        if (password === confirmPassword) {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          console.log(response.data);
          setToken(response.data.token);
        } else {
          setErrorMessage("Les mots de passe ne sont pas identiques.");
        }
      } else {
        setErrorMessage("Tous les champs sont obligatoires");
      }
    } catch (error) {
      const errorResponse = error.response.data.error;
      console.log(error.message);
      console.log(errorResponse);

      if (errorResponse === "This email already has an acount.") {
        setErrorMessage("Cet email a déjà un compte");
      }
      if (errorResponse === "This username already has an account.") {
        setErrorMessage("Ce nom d'utilisateur est déjà pris.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <Text style={styles.mainTitle}>S'inscrire</Text>

        <View style={styles.formContainer}>
          <Input
            style={styles.input}
            placeholder="Votre email"
            setFunction={setEmail}
          />
          <Input
            placeholder="Votre nom d'utilisateur"
            setFunction={setUsername}
            autoCorrect
          />
          <TextArea
            placeholder="Décrivez-vous en quelques lignes..."
            setFunction={setDescription}
          />
          <Input
            placeholder="Votre mot de passe"
            setFunction={setPassword}
            securePassword
          />
          <Input
            placeholder="Confirmez votre mot de passe"
            setFunction={setConfirmPassword}
            securePassword
          />
        </View>

        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleValidateSignup}
          >
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.bottomText}>
            Vous avez déjà un compte ? connectez-vous.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: 200,
    resizeMode: "contain",
  },

  mainTitle: {
    textAlign: "center",
    fontSize: 40,
    color: "#868686",
  },

  //FORM
  formContainer: {
    justifyContent: "flex-start",
    marginTop: 30,
  },

  //BUTTON
  buttonContainer: {
    alignItems: "center",
  },

  button: {
    borderWidth: 2,
    borderColor: "#FF5B61",
    borderRadius: 20,
    height: 60,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#868686",
    fontWeight: "bold",
  },

  //CONNECT TEXT

  bottomText: {
    textAlign: "center",
    fontSize: 13,
    color: "#868686",
    fontWeight: "bold",
  },
  //ERROR

  errorMessage: {
    textAlign: "center",
    color: "red",
    fontSize: 15,
  },
});
