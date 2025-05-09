import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../../../Theme/ThemeProvider";
import PrimaryText from "../../Texts/PrimaryText";

type PrimaryInputProps = TextInputProps & {
  error?: string;
};

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  value,
  onChangeText,
  style,
  error,
  ...props
}) => {
  const {
    background: inputBackground,
    text: borderColor,
    text,
    danger, // Assuming you have a danger (red) color in your theme
    primary,
  } = useTheme();

  const borderColorToUse = error ? danger : borderColor;

  return (
    <>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: inputBackground,
            borderColor: borderColorToUse,
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
      {error ? (
        <PrimaryText style={[styles.errorLabel, { color: danger }]}>
          {error}
        </PrimaryText>
      ) : null}
    </>
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
  errorLabel: {
    marginTop: 4,
    fontSize: 14,
  },
});
