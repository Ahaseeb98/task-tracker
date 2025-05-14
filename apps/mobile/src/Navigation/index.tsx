import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AUTH_ROUTES, MAIN_ROUTES } from "./Routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, useColorScheme } from "react-native";
import { useAppSelector } from "../Redux/reduxHook";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../Theme/ThemeProvider";

const Stack = createStackNavigator();

const Navigation = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!isAuthenticated ? (
            <Stack.Group>
              {AUTH_ROUTES.map((screen) => {
                return (
                  <Stack.Screen
                    key={screen.path}
                    name={screen.path}
                    component={screen.Component}
                  />
                );
              })}
            </Stack.Group>
          ) : (
            <Stack.Group>
              {MAIN_ROUTES.map((screen) => {
                return (
                  <Stack.Screen
                    key={screen.path}
                    name={screen.path}
                    component={screen.Component}
                  />
                );
              })}
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={theme.backgroundSecondary}
      />
    </SafeAreaView>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
