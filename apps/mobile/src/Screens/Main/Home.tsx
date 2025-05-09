import React, { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import PrimaryBackground from "../../Components/Backgrounds/PrimaryBackground";
import PrimaryText from "../../Components/Texts/PrimaryText";
import FABButton from "../../Components/Buttons/FABButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CREATE_TASK_PATH } from "../../Navigation/Paths";
import { getTasks } from "../../Api/taskService";
import { useDispatch } from "react-redux";
import { addTasks } from "../../Redux/Reducers/taskSlice";
import { useAppSelector } from "../../Redux/reduxHook";
import TaskCard from "../../Components/Cards/TaskCard";

const Home = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const tasks = useAppSelector((state) => state.task.tasks);
  const user = useAppSelector((state) => state.auth.user);
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const fetchTasks = async () => {
    try {
      const results = await getTasks();
      dispatch(addTasks(results));
    } catch (error) {}
  };
  return (
    <PrimaryBackground style={styles.container}>
      <PrimaryText weight="bold" style={styles.h1}>
        {user?.role === "employer" ? "Dashboard" : "Assigned Tasks"}
      </PrimaryText>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TaskCard data={item} />}
      />
      {user?.role === "employer" && (
        <FABButton onPress={() => navigate(CREATE_TASK_PATH as never)} />
      )}
    </PrimaryBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
