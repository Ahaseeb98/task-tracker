import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import PrimaryBackground from "../../Components/Backgrounds/PrimaryBackground";
import PrimaryText from "../../Components/Texts/PrimaryText";
import { useAppDispatch, useAppSelector } from "../../Redux/reduxHook";
import { API_BASE_URL } from "../../Constants/API_ROUTES";
import PrimaryHeader from "../../Components/Headers/PrimaryHeader";
import { useTheme } from "../../Theme/ThemeProvider";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import ConfirmationModal from "../../Components/Modals/ConfimationModal";
import { deleteTask } from "../../Api/taskService";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { COMMENTS_PATH, CREATE_TASK_PATH } from "../../Navigation/Paths";

const Task: React.FC = ({ route }: any) => {
  const { goBack, navigate } = useNavigation();
  const { backgroundSecondary, danger, text } = useTheme();
  const taskId = route.params.id;
  const task = useAppSelector((state) =>
    state.task?.tasks.find((task) => task?._id === taskId)
  );

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteTask(taskId);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Task deleted Successfully!",
      });
      setConfirmationModal(false);
      goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const labelValueStyles = [styles.text, { color: text }];
  return (
    <PrimaryBackground style={styles.container}>
      <PrimaryHeader title={"Task Details"} />
      <ScrollView contentContainerStyle={styles.content}>
        {task?.picture && (
          <Image
            source={{ uri: API_BASE_URL + task?.picture }}
            style={styles.image}
          />
        )}
        <View
          style={[styles.details, { backgroundColor: backgroundSecondary }]}
        >
          <PrimaryText weight="bold" style={styles.h1}>
            {task?.title}
          </PrimaryText>

          <PrimaryText style={styles.label}>Description:</PrimaryText>
          <PrimaryText style={labelValueStyles}>
            {task?.description}
          </PrimaryText>

          <PrimaryText style={styles.label}>Status:</PrimaryText>
          <PrimaryText style={labelValueStyles}>{task?.status}</PrimaryText>

          <PrimaryText style={styles.label}>Reward Price:</PrimaryText>
          <PrimaryText style={labelValueStyles}>
            ${task?.rewardPrice}
          </PrimaryText>

          {task?.assignee?.name && (
            <>
              <PrimaryText style={styles.label}>Assignee:</PrimaryText>
              <PrimaryText style={labelValueStyles}>
                {task?.assignee?.name}
              </PrimaryText>
            </>
          )}

          {task?.createdBy?.name && (
            <>
              <PrimaryText style={styles.label}>Created By:</PrimaryText>
              <PrimaryText style={labelValueStyles}>
                {task?.createdBy?.name}
              </PrimaryText>
            </>
          )}

          <PrimaryText style={styles.label}>Created At:</PrimaryText>
          <PrimaryText style={labelValueStyles}>
            {new Date(
              // @ts-expect-error
              task?.createdAt
            ).toLocaleString()}
          </PrimaryText>
          <PrimaryText style={styles.label}>Updated At:</PrimaryText>
          <PrimaryText style={labelValueStyles}>
            {new Date(
              // @ts-expect-error
              task?.updatedAt
            ).toLocaleString()}
          </PrimaryText>
        </View>
        {Boolean(!task?.assignee) && (
          <View style={styles.btnRow}>
            <PrimaryButton
              style={styles.btn}
              title="Edit"
              onPress={() =>
                navigate(
                  // @ts-expect-error
                  CREATE_TASK_PATH,
                  { id: taskId }
                )
              }
            />
            <PrimaryButton
              style={{ ...styles.btn, backgroundColor: danger }}
              title="Delete"
              onPress={() => setConfirmationModal(true)}
            />
          </View>
        )}

        <PrimaryButton
          title="Comments"
          onPress={() =>
            // @ts-expect-error
            navigate(COMMENTS_PATH, { id: taskId })
          }
        />
      </ScrollView>
      <ConfirmationModal
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onCancel={() => setConfirmationModal(false)}
        onConfirm={handleDelete}
        visible={confirmationModal}
        loading={loading}
      />
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
    gap: 10,
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
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 16,
  },
  details: {
    padding: 10,
    borderRadius: 12,
  },
  btnRow: {
    gap: 10,
    flexDirection: "row",
  },
  btn: {
    flex: 1,
  },
});
