import React, { useCallback, useState } from "react";
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
import PrimaryHeader from "../../Components/Headers/PrimaryHeader";

const Home = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const tasks = useAppSelector((state) => state.task.tasks);
  const user = useAppSelector((state) => state.auth.user);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async () => {
    try {
      const results = await getTasks();
      dispatch(addTasks(results));
      setRefreshing(false);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  return (
    <PrimaryBackground style={styles.container}>
      <PrimaryHeader
        title={user?.role === "employer" ? "Dashboard" : "Assigned Tasks"}
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TaskCard data={item} />}
        contentContainerStyle={styles.list}
        onRefresh={onRefresh}
        refreshing={refreshing}
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
  list: {
    padding: 12,
  },
});
