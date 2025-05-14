import React, { useEffect, useState } from "react";
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
import ImageInput, {
  AvatarFile,
} from "../../Components/Forms/Inputs/ImageInput";
import { registerRequest } from "../../Api/authService";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { getUsers } from "../../Api/userService";
import { addUsers, login } from "../../Redux/Reducers/authSlice";
import { useAppSelector } from "../../Redux/reduxHook";

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const SignupScreen = () => {
  const { text, primary } = useTheme();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const users = useAppSelector((state) => state.auth.users);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    referredBy: "",
    role: "",
  });

  const [avatar, setAvatar] = useState<AvatarFile | null>(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof form, value: string | File) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    let valid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setAddressError("");
    setRoleError("");

    if (!form.name.trim()) {
      setNameError("Name is required.");
      valid = false;
    }

    if (!validateEmail(form.email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    }

    if (!form.password.trim()) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (form.password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }

    if (!form.role.trim()) {
      setRoleError("Please select a role.");
      valid = false;
    }

    if (!valid) return;

    // Create FormData
    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("password", form.password);
    form.address && data.append("address", form.address);
    form.referredBy && data.append("referredBy", form.referredBy);
    data.append("role", form.role);

    // Append avatar if it exists
    if (avatar) {
      data.append("file", {
        uri: avatar.uri,
        name: avatar.fileName,
        type: avatar.mimeType,
      } as any);
    }

    // Simulate the request (replace with actual API call)
    setLoading(true);
    try {
      console.log(data);
      const result = await registerRequest(data);
      dispatch(login(result));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Signup Successful!",
      });
      // Handle success (Navigate or show success message)
    } catch (error) {
      console.log("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userData = await getUsers();

      dispatch(addUsers(userData));
    } catch (error) {}
  };

  const inputColors = { color: text, borderColor: text };
  const inputStyles = [styles.input, inputColors];
  const selectableUsers = users?.map((user) => ({
    label: user.name || "",
    value: user._id,
  }));

  console.log(form);
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
          style={inputStyles}
          placeholder="Name"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
          error={nameError}
        />

        <PrimaryInput
          style={inputStyles}
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
        />

        <PrimaryInput
          style={inputStyles}
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
          error={passwordError}
        />

        <PrimaryInput
          style={inputStyles}
          placeholder="Address"
          value={form.address}
          onChangeText={(text) => handleChange("address", text)}
          error={addressError}
        />

        {Platform.OS === "ios" ? (
          <PrimarySelectIos
            style={{ ...styles.inputIos, ...inputColors }}
            placeholder="Referred By (optional)"
            selectedValue={form.referredBy}
            items={selectableUsers}
            onValueChange={(value: string) => handleChange("referredBy", value)}
          />
        ) : (
          <PrimarySelectAndroid
            style={{ ...styles.input, ...inputColors }}
            placeholder="Referred By (optional)"
            selectedValue={form.referredBy}
            items={selectableUsers}
            onValueChange={(value: string) => handleChange("referredBy", value)}
          />
        )}

        <ImageInput
          style={inputStyles}
          onImagePicked={(file: AvatarFile) => setAvatar(file)}
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
            onValueChange={(value: string) => handleChange("role", value)}
            error={roleError}
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
            onValueChange={(value: string) => handleChange("role", value)}
            error={roleError}
          />
        )}

        <PrimaryButton
          title="Sign Up"
          onPress={handleSubmit}
          style={styles.input}
          loading={loading}
        />

        <View style={styles.link}>
          <PrimaryText>
            Already have an account?{" "}
            <TouchableText
              onPress={() => navigate(LOGIN_PATH as never)}
              style={[styles.linkText, { color: primary }]}
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
    padding: 20,
  },
  input: {
    borderRadius: 8,
    // padding: 12,
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
