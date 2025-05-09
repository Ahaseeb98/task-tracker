import React from "react";
import { Text, View, StyleSheet } from "react-native";
import PrimaryBackground from "../../Components/Backgrounds/PrimaryBackground";
import PrimaryText from "../../Components/Texts/PrimaryText";

const Task = () => {
  return (
    <PrimaryBackground style={styles.container}>
      <PrimaryText weight="bold" style={styles.h1}>
        Task
      </PrimaryText>
    </PrimaryBackground>
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
