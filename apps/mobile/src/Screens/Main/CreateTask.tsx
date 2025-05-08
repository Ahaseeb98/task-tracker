import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CreateTask = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>CreateTask</Text>
    </View>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
