import { StyleSheet, View } from "react-native";
import Navigation from "./src/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/Theme/ThemeProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/Redux";
import { Provider } from "react-redux";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <ThemeProvider>
              <Navigation />
            </ThemeProvider>
          </Provider>
        </PersistGate>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
