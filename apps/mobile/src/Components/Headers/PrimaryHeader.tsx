import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../Theme/ThemeProvider";
import { PROFILE_PATH } from "../../Navigation/Paths";
import USER_IMAGE from "./../../../assets/Images/Placeholders/user.jpg";
import { useAppSelector } from "../../Redux/reduxHook";
import { API_BASE_URL } from "../../Constants/API_ROUTES";
type PrimaryHeaderProps = {
  title: string;
};

const PrimaryHeader: React.FC<PrimaryHeaderProps> = ({ title }) => {
  const { goBack, navigate } = useNavigation();
  const canGoBack = useNavigationState((state) => state.index > 0);
  const { background, text, primary } = useTheme();
  const user = useAppSelector((state) => state.auth.user);
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      {canGoBack ? (
        <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={[styles.title, { color: text }]}>{title}</Text>

      <TouchableOpacity
        onPress={() => navigate(PROFILE_PATH as never)}
        style={styles.profileContainer}
      >
        <Image
          source={
            user?.avatar ? { uri: API_BASE_URL + user?.avatar } : USER_IMAGE
          }
          style={[styles.profileImage, { borderColor: primary }]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  profileContainer: {
    padding: 4,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: "#ddd",
  },
});
