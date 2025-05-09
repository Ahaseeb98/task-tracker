import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import { useTheme } from "../../Theme/ThemeProvider";
import PrimaryInput from "../../Components/Forms/Inputs/PrimaryInput";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import PrimaryBackground from "../../Components/Backgrounds/PrimaryBackground";
import PrimaryText from "../../Components/Texts/PrimaryText";
import TouchableText from "../../Components/Texts/TouchableText";
import { LOGIN_PATH } from "../../Navigation/Paths";
import { useNavigation } from "@react-navigation/native";
import PrimarySelectAndroid from "../../Components/Forms/Selects/PrimarySelect.android";
import PrimarySelectIos from "../../Components/Forms/Selects/PrimarySelect.ios";
import ImageInput from "../../Components/Forms/Inputs/ImageInput";

const SignupScreen = () => {
  const { text, primary } = useTheme();
  const { navigate } = useNavigation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    referredBy: "",
    avatar: "",
    role: "", // default
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    // validate and send to backend
    console.log("Submitting form:", form);
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Validation Error", "Please fill all required fields.");
      return;
    }

    // Replace this with actual API call
    console.log("Submitting form:", form);
  };
  const inputColors = { color: text, borderColor: text };

  return (
    <PrimaryBackground style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <PrimaryText weight="bold" style={{ color: text, fontSize: 24 }}>
          Signup
        </PrimaryText>
        <PrimaryInput
          style={[styles.input, inputColors]}
          placeholder="Name"
          value={form.name}
          onChangeText={(text: string) => handleChange("name", text)}
        />
        <PrimaryInput
          style={[styles.input, inputColors]}
          placeholder="Email"
          value={form.email}
          onChangeText={(text: string) => handleChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <PrimaryInput
          style={[styles.input, inputColors]}
          placeholder="Password"
          value={form.password}
          onChangeText={(text: string) => handleChange("password", text)}
          secureTextEntry
        />
        <PrimaryInput
          style={[styles.input, inputColors]}
          placeholder="Address"
          value={form.address}
          onChangeText={(text: string) => handleChange("address", text)}
        />
        <PrimaryInput
          style={[styles.input, inputColors]}
          placeholder="Referred By (optional)"
          value={form.referredBy}
          onChangeText={(text: string) => handleChange("referredBy", text)}
        />
        <ImageInput
          style={[styles.inputIos, inputColors]}
          onImagePicked={(text: string) => handleChange("avatar", text)}
        />

        {Platform.OS === "ios" ? (
          <PrimarySelectIos
            style={{ ...styles.inputIos, ...inputColors }}
            placeholder="Role (employee/employer)"
            selectedValue={form.role}
            items={[
              { label: "Employee", value: "employee" },
              { label: "Employer", value: "employer" },
            ]}
            onValueChange={(itemValue: any) => handleChange("role", itemValue)}
          />
        ) : (
          <PrimarySelectAndroid
            style={{ ...styles.input, ...inputColors }}
            placeholder="Role (employee/employer)"
            selectedValue={form.role}
            items={[
              { label: "Employee", value: "employee" },
              { label: "Employer", value: "employer" },
            ]}
            onValueChange={(itemValue: any) => handleChange("role", itemValue)}
          />
        )}

        <PrimaryButton
          title="Sign Up"
          onPress={handleSubmit}
          style={styles.input}
        />
        <View style={styles.link}>
          <PrimaryText>
            Already have an account?{" "}
            <TouchableText
              onPress={() => navigate(LOGIN_PATH as never)}
              style={[
                styles.linkText,
                {
                  color: primary,
                },
              ]}
              weight="bold"
            >
              Sign in
            </TouchableText>
          </PrimaryText>
        </View>
      </ScrollView>
    </PrimaryBackground>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
  },
  inputIos: {
    borderRadius: 8,
    marginVertical: 10,
  },
  link: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  linkText: {
    marginBottom: Platform.OS === "ios" ? -3.5 : -3,
  },
});
