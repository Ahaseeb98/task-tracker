import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import PrimaryBackground from "../../Components/Backgrounds/PrimaryBackground";
import PrimaryButton from "../../Components/Buttons/PrimaryButton"; // Same here
import PrimaryInput from "../../Components/Forms/Inputs/PrimaryInput";
import ImageInput, {
  AvatarFile,
} from "../../Components/Forms/Inputs/ImageInput";
import { createTask, updateTask } from "../../Api/taskService";
import { useDispatch } from "react-redux";
import { addNewTask, editTask } from "../../Redux/Reducers/taskSlice";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { getUsers } from "../../Api/userService";
import { addUsers } from "../../Redux/Reducers/authSlice";
import PrimarySelectIos from "../../Components/Forms/Selects/PrimarySelect.ios";
import PrimarySelectAndroid from "../../Components/Forms/Selects/PrimarySelect.android";
import { useAppSelector } from "../../Redux/reduxHook";
import PrimaryHeader from "../../Components/Headers/PrimaryHeader";

const CreateTask = ({ route }: any) => {
  const taskId = route.params.id;

  const users = useAppSelector((state) => state.auth.users);
  const task = useAppSelector((state) =>
    state.task?.tasks.find((task) => task?._id === taskId)
  );
  const { goBack } = useNavigation();
  const dispatch = useDispatch();
  const [image, setImage] = useState<AvatarFile | string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    picture: "",
    assignee: "",
    rewardPrice: "",
  });

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [pictureError, setPictureError] = useState("");
  const [assigneeError, setAssigneeError] = useState("");
  const [rewardPriceError, setRewardPriceError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleValidation = () => {
    let valid = true;

    setTitleError("");
    setDescriptionError("");
    setPictureError("");
    setAssigneeError("");
    setRewardPriceError("");

    if (!form.title.trim()) {
      setTitleError("Title is required.");
      valid = false;
    }

    if (!form.description.trim()) {
      setDescriptionError("Description is required.");
      valid = false;
    }

    if (!form.rewardPrice.trim()) {
      setRewardPriceError("Reward price is required.");
      valid = false;
    } else if (isNaN(Number(form.rewardPrice))) {
      setRewardPriceError("Reward must be a number.");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async () => {
    const isValid = handleValidation();

    if (!isValid) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    form.assignee && formData.append("assignee", form.assignee);
    formData.append("rewardPrice", form.rewardPrice);
    const imageType = typeof image;
    const uploadedImage = image as AvatarFile;
    if (imageType !== "string" && (image as AvatarFile)) {
      formData.append("file", {
        uri: uploadedImage.uri,
        name: uploadedImage.fileName,
        type: uploadedImage.mimeType,
      } as any);
    }

    setLoading(true);
    try {
      const result = await createTask(formData);
      dispatch(addNewTask(result));
      goBack();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Task created successfully!",
      });
      // Handle success (Navigate or show success message)
    } catch (error) {
      console.log("create tas error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    const isValid = handleValidation();

    if (!isValid) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    form.assignee && formData.append("assignee", form.assignee);
    formData.append("rewardPrice", form.rewardPrice);
    const imageType = typeof image;
    const uploadedImage = image as AvatarFile;
    if (imageType !== "string" && (image as AvatarFile)) {
      formData.append("file", {
        uri: uploadedImage.uri,
        name: uploadedImage.fileName,
        type: uploadedImage.mimeType,
      } as any);
    }

    setLoading(true);
    try {
      const result = await updateTask(taskId, formData);
      dispatch(editTask(result));
      goBack();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Task edited successfully!",
      });
      // Handle success (Navigate or show success message)
    } catch (error) {
      console.log("create tas error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (task && taskId) {
      setForm({
        title: task.title,
        description: task.description,
        picture: task.picture || "",
        assignee: task?.assignee?._id || "",
        rewardPrice: task.rewardPrice || "",
      });
      if (task.picture) {
        setImage(task.picture);
      }
    }
  }, taskId);

  const fetchUsers = async () => {
    try {
      const userData = await getUsers();

      dispatch(addUsers(userData));
    } catch (error) {}
  };

  const selectableUsers = users?.map((user) => ({
    label: user.name || "",
    value: user._id,
  }));

  const titleString = `${taskId ? "Edit" : "Create"} Task`;

  return (
    <PrimaryBackground style={styles.container}>
      <PrimaryHeader title={titleString} />

      <View style={styles.form}>
        <PrimaryInput
          style={styles.input}
          placeholder="Title"
          value={form.title}
          onChangeText={(text) => handleChange("title", text)}
          error={titleError}
        />
        <PrimaryInput
          style={styles.input}
          placeholder="Description"
          value={form.description}
          onChangeText={(text) => handleChange("description", text)}
          error={descriptionError}
        />

        <ImageInput
          label="Upload Image"
          style={styles.input}
          onImagePicked={(file: AvatarFile) => setImage(file)}
        />

        {Platform.OS === "ios" ? (
          <PrimarySelectIos
            style={styles.input}
            placeholder="Assignee"
            selectedValue={form.assignee}
            items={selectableUsers}
            onValueChange={(value: string) => handleChange("assignee", value)}
            error={assigneeError}
          />
        ) : (
          <PrimarySelectAndroid
            style={styles.input}
            placeholder="Assignee"
            selectedValue={form.assignee}
            items={selectableUsers}
            onValueChange={(value: string) => handleChange("assignee", value)}
            error={assigneeError}
          />
        )}
        <PrimaryInput
          style={styles.input}
          placeholder="Reward Price"
          value={form.rewardPrice}
          keyboardType="numeric"
          onChangeText={(text) => handleChange("rewardPrice", text)}
          error={rewardPriceError}
        />

        <PrimaryButton
          style={styles.input}
          loading={loading}
          disabled={loading}
          title={titleString}
          onPress={taskId ? handleEdit : handleSubmit}
        />
      </View>
    </PrimaryBackground>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 24,
    marginBottom: 16,
  },
  form: {
    padding: 16,
  },
  input: {
    borderRadius: 8,
    marginVertical: 10,
  },
});
