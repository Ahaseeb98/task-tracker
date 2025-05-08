import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { useTheme } from "../../../Theme/ThemeProvider";

type PrimaryInputProps = TextInputProps;

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  value,
  onChangeText,
  style,
  ...props
}) => {
  const {
    background: inputBackground,
    text: borderColor,
    text,
    primary,
  } = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: inputBackground,
          borderColor: borderColor,
          color: text,
        },
        style,
      ]}
      selectionColor={primary}
      placeholderTextColor={text + "99"} // 60% opacity
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
};

export default PrimaryInput;

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
