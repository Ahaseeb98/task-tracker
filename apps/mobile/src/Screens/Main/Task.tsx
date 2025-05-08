import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Task = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Task</Text>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
