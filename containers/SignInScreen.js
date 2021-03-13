import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../components/Input";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConnect = async () => {
    try {
      if (email && password) {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        if (response.data.token) {
          setToken(response.data.token);
        } else {
          alert("une erreur est survenue, merci de rééssayer plus tard");
        }
      } else {
        setErrorMessage("Tous les champs doivent être remplis");
      }
    } catch (error) {
      const errorResponse = error.response.data.error;
      console.log(error.message);
      console.log(errorResponse);
      if (errorResponse === "Unauthorized") {
        setErrorMessage("Mot de passe et/ou email invalide.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <Text style={styles.mainTitle}>Se connecter</Text>
        <View style={styles.formContainer}>
          <Input placeholder="Votre email" setFunction={setEmail} />
          <Input
            placeholder="Votre mot de passe"
            setFunction={setPassword}
            securePassword
          />
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleConnect}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.bottomText}>
              Vous n'avez pas de compte ? Inscrivez-vous.
            </Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 100,
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
    marginBottom: 50,
    marginTop: 30,
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
    marginTop: 100,
  },
});
