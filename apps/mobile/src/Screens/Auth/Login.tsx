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
import { validateEmail } from "../../Utils/validate";
import { loginRequest } from "../../Api/authService";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { login } from "../../Redux/Reducers/authSlice";

const LoginScreen = () => {
  const { primary, text } = useTheme();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    let valid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!valid) return;

    // Proceed with login
    console.log("Logging in with:", { email, password });
    setLoading(true);
    try {
      const data = await loginRequest(email, password);
      dispatch(login(data));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login Successful!",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        error={emailError}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <PrimaryInput
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={passwordError}
        style={styles.input}
      />

      <PrimaryButton
        loading={loading}
        disabled={loading}
        style={styles.input}
        title="Login"
        onPress={handleLogin}
      />

      <View style={styles.link}>
        <PrimaryText>
          Don't have an account?{" "}
          <TouchableText
            onPress={() => navigate(SIGNUP_PATH as never)}
            style={[styles.linkText, { color: primary }]}
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
