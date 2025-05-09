import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import PrimaryBackground from "../../Components/Backgrounds/PrimaryBackground";
import PrimaryText from "../../Components/Texts/PrimaryText";
import { useAppDispatch, useAppSelector } from "../../Redux/reduxHook";
import { API_BASE_URL } from "../../Constants/API_ROUTES";

const Task: React.FC = ({ route }: any) => {
  const taskId = route.params.id;
  const task = useAppSelector((state) =>
    state.task?.tasks.find((task) => task?._id === taskId)
  );

  console.log(task, "task");
  return (
    <PrimaryBackground style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {task?.picture && (
          <Image
            source={{ uri: API_BASE_URL + task?.picture }}
            style={styles.image}
          />
        )}
        <PrimaryText weight="bold" style={styles.h1}>
          {task?.title}
        </PrimaryText>

        <PrimaryText style={styles.label}>Description:</PrimaryText>
        <PrimaryText style={styles.text}>{task?.description}</PrimaryText>

        <PrimaryText style={styles.label}>Status:</PrimaryText>
        <PrimaryText style={styles.text}>{task?.status}</PrimaryText>

        <PrimaryText style={styles.label}>Reward Price:</PrimaryText>
        <PrimaryText style={styles.text}>${task?.rewardPrice}</PrimaryText>

        {task?.assignee?.name && (
          <>
            <PrimaryText style={styles.label}>Assignee:</PrimaryText>
            <PrimaryText style={styles.text}>
              {task?.assignee?.name}
            </PrimaryText>
          </>
        )}

        {task?.createdBy?.name && (
          <>
            <PrimaryText style={styles.label}>Created By:</PrimaryText>
            <PrimaryText style={styles.text}>
              {task?.createdBy?.name}
            </PrimaryText>
          </>
        )}

        <PrimaryText style={styles.label}>Created At:</PrimaryText>
        <PrimaryText style={styles.text}>
          {new Date(
            // @ts-expect-error
            task?.createdAt
          ).toLocaleString()}
        </PrimaryText>
        <PrimaryText style={styles.label}>Updated At:</PrimaryText>
        <PrimaryText style={styles.text}>
          {new Date(
            // @ts-expect-error
            task?.updatedAt
          ).toLocaleString()}
        </PrimaryText>
      </ScrollView>
    </PrimaryBackground>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    fontWeight: "600",
    fontSize: 16,
  },
  text: {
    fontSize: 15,
    color: "#555",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 16,
  },
});
