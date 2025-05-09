import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Or any icon library you use
import { useTheme } from "../../Theme/ThemeProvider";

type FABButtonProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  style?: ViewStyle;
  size?: number;
  color?: string;
};

const FABButton: React.FC<FABButtonProps> = ({
  icon = "add",
  onPress,
  style = {},
  size = 24,
}) => {
  const { primary, text } = useTheme();
  return (
    <Pressable
      style={[styles.fab, { backgroundColor: primary }, style]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={size} color={text} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default FABButton;
