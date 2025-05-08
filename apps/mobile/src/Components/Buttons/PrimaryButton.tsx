import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../../Theme/ThemeProvider";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled,
  style,
  textStyle,
}) => {
  const { primary, primaryText, disabled: disabledColor } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? disabledColor : primary },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: primaryText }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
