import React from "react";
import { Text, TextProps, TextStyle, Platform } from "react-native";
import { useTheme } from "../../Theme/ThemeProvider";

export interface PrimaryTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
  weight?: "black" | "bold" | "regular" | "medium";
}

const fontMap = {
  black: "Inter-Black",
  bold: "Inter-Bold",
  regular: "Inter_400Regular",
  medium: "Inter-Medium",
};

const PrimaryText: React.FC<PrimaryTextProps> = ({
  style,
  children,
  weight = "regular",
  ...rest
}) => {
  const theme = useTheme();
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: fontMap[weight],
          color: theme.text,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default PrimaryText;
