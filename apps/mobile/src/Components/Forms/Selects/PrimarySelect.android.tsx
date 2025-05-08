import React from "react";
import RNPickerSelect, { Item } from "react-native-picker-select";
import { StyleSheet, Platform, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "../../../Theme/ThemeProvider";

type PrimarySelectProps = {
  selectedValue: string;
  onValueChange: (value: string, index: number) => void;
  items: Item[];
  placeholder?: string;
  style?: ViewStyle;
};

const PrimarySelect: React.FC<PrimarySelectProps> = ({
  selectedValue,
  onValueChange,
  items,
  placeholder,
  style,
}) => {
  const { text, background } = useTheme();

  return (
    <RNPickerSelect
      value={selectedValue}
      onValueChange={onValueChange}
      items={items}
      placeholder={{ label: placeholder || "Select an option", value: null }}
      useNativeAndroidPickerStyle={false}
      pickerProps={{
        mode: "dropdown",
      }}
      style={{
        inputIOS: {
          ...styles.input,
          color: text,
          backgroundColor: background,
          ...(style || {}),
        },
        inputAndroid: {
          ...styles.input,
          color: text,
          backgroundColor: background,
          borderColor: text,
          ...(style || {}),
        },
        placeholder: {
          color: text + "99",
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
  },
});

export default PrimarySelect;
