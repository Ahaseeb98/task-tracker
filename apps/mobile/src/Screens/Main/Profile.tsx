import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import PrimaryBackground from "../../Components/Backgrounds/PrimaryBackground";
import PrimaryHeader from "../../Components/Headers/PrimaryHeader";
import PrimaryText from "../../Components/Texts/PrimaryText";
import { useAppSelector } from "../../Redux/reduxHook";
import { useTheme } from "../../Theme/ThemeProvider";
import USER_IMAGE from "./../../../assets/Images/Placeholders/user.jpg";
import { API_BASE_URL } from "../../Constants/API_ROUTES";
import { logout as logoutService } from "../../Api/authService";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Reducers/authSlice";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";

const Profile = () => {
  const { text, primary, backgroundSecondary } = useTheme();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await logoutService();
    dispatch(logout());
  };

  const Info = ({
    label,
    value,
    color,
  }: {
    label: string;
    value?: string;
    color: string;
  }) => (
    <View style={[styles.infoRow, { backgroundColor: backgroundSecondary }]}>
      <PrimaryText weight="bold" style={{ color }}>
        {label}
      </PrimaryText>
      <PrimaryText weight="regular" style={{ color }}>
        {value || "N/A"}
      </PrimaryText>
    </View>
  );

  return (
    <PrimaryBackground style={styles.container}>
      <PrimaryHeader title="My Profile" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.center}>
          <Image
            source={
              user?.avatar ? { uri: API_BASE_URL + user.avatar } : USER_IMAGE
            }
            style={[styles.avatar, { borderColor: primary }]}
          />
          <PrimaryText weight="medium" style={{ fontSize: 24 }}>
            {user?.name || "No Name"}
          </PrimaryText>
          <PrimaryText weight="medium" style={{ fontSize: 16 }}>
            {user?.email}
          </PrimaryText>
        </View>

        <View style={styles.infoSection}>
          <Info label="Address" value={user?.address} color={text} />
          <Info label="Role" value={user?.role} color={text} />
          <Info
            label="Referred By"
            value={user?.referredBy || "N/A"}
            color={text}
          />
          <Info
            label="Created At"
            value={formatDate(user?.createdAt)}
            color={text}
          />
          <Info
            label="Updated At"
            value={formatDate(user?.updatedAt)}
            color={text}
          />
        </View>
        <PrimaryButton title="Logout" onPress={() => handleLogout()} />
      </ScrollView>
    </PrimaryBackground>
  );
};

const formatDate = (date?: Date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    paddingBottom: 32,
  },
  center: {
    alignItems: "center",
    marginVertical: 24,
    gap: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
  },
  infoSection: {
    gap: 10,
  },
  infoRow: {
    marginBottom: 5,
    padding: 15,
    borderRadius: 12,
  },
});

export default Profile;
