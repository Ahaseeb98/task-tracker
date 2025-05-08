import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { useTheme } from "../../Theme/ThemeProvider";

type PrimaryBackgroundProps = ViewProps & {
  children: React.ReactNode;
};

const PrimaryBackground: React.FC<PrimaryBackgroundProps> = ({
  children,
  style,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }, style]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default PrimaryBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
