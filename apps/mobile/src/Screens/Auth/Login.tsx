import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import PrimaryBackground from "../../Components/Backgrounds/PrimaryBackground";
import PrimaryText from "../../Components/Texts/PrimaryText";
import { useTheme } from "../../Theme/ThemeProvider";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import PrimaryInput from "../../Components/Forms/Inputs/PrimaryInput";
import TouchableText from "../../Components/Texts/TouchableText";
import { useNavigation } from "@react-navigation/native";
import { SIGNUP_PATH } from "../../Navigation/Paths";

const LoginScreen = () => {
  const { primary, text } = useTheme();
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { email, password });
    // handle authentication logic here
  };

  const inputColors = { color: text, borderColor: text };

  return (
    <PrimaryBackground style={styles.container}>
      <PrimaryText weight="bold" style={{ color: text, fontSize: 24 }}>
        Login
      </PrimaryText>

      <PrimaryInput
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, inputColors]}
      />

      <PrimaryInput
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, inputColors]}
      />

      <PrimaryButton style={styles.input} title="Login" onPress={handleLogin} />

      <View style={styles.link}>
        <PrimaryText>
          Don't have an account?{" "}
          <TouchableText
            onPress={() => navigate(SIGNUP_PATH as never)}
            style={[
              styles.linkText,
              {
                color: primary,
              },
            ]}
            weight="bold"
          >
            Sign up
          </TouchableText>
        </PrimaryText>
      </View>
    </PrimaryBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
  },
  link: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  linkText: {
    marginBottom: -3.5,
  },
});
