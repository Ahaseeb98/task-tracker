import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme, AppTheme } from "./index";

const ThemeContext = createContext<AppTheme>(LightTheme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
  console.log(colorScheme, "colorScheme");

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
