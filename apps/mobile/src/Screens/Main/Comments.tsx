import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PrimaryBackground from "../../Components/Backgrounds/PrimaryBackground";
import PrimaryHeader from "../../Components/Headers/PrimaryHeader";
import PrimaryText from "../../Components/Texts/PrimaryText";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import { useTheme } from "../../Theme/ThemeProvider";
import { useDispatch } from "react-redux";
import CommentCard from "../../Components/Cards/CommentCard";
import { useAppSelector } from "../../Redux/reduxHook";
import PrimaryInput from "../../Components/Forms/Inputs/PrimaryInput";

import PrimarySelectIos from "../../Components/Forms/Selects/PrimarySelect.ios";
import PrimarySelectAndroid from "../../Components/Forms/Selects/PrimarySelect.android";

const statusSelectable = ["Pending", "In Progress", "Completed"].map(
  (item) => ({
    label: item,
    value: item,
  })
);
const Comments = ({ route }: any) => {
  const { taskId } = route.params;
  const { text, backgroundSecondary } = useTheme();
  const dispatch = useDispatch();

  const task = useAppSelector((state) =>
    state.task?.tasks.find((t) => t?._id === taskId)
  );

  const taskComments = task?.comments || [];
  const taskStatus = task?.status || "Pending";

  const [form, setForm] = useState({
    comment: "",
    status: taskStatus,
  });

  const [commentError, setCommentError] = useState("");

  const handleAddComment = () => {
    if (!form.comment.trim()) {
      setCommentError("Comment is required");
    }
    // dispatch(addCommentToTask({ taskId, comment }));
    setForm({
      comment: "",
      status: taskStatus,
    });
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <PrimaryBackground style={styles.container}>
      <PrimaryHeader title="Comments" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardWrapper}
      >
        <FlatList
          contentContainerStyle={styles.list}
          data={taskComments}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <CommentCard comment={item} />}
        />

        {/* Footer input and status */}
        <View style={[styles.footer, { backgroundColor: backgroundSecondary }]}>
          {Platform.OS === "ios" ? (
            <PrimarySelectIos
              style={styles.input}
              placeholder="Assignee"
              selectedValue={form.status}
              items={statusSelectable}
              onValueChange={(value: string) => handleChange("assignee", value)}
            />
          ) : (
            <PrimarySelectAndroid
              style={styles.input}
              placeholder="Assignee"
              selectedValue={form.status}
              items={statusSelectable}
              onValueChange={(value: string) => handleChange("assignee", value)}
            />
          )}
          <PrimaryInput
            style={[styles.input, { color: text }]}
            placeholder="Write a comment..."
            value={form.comment}
            onChangeText={(value) => handleChange("comment", value)}
            multiline
            error={commentError}
            numberOfLines={5}
          />
          <PrimaryButton title="Send" onPress={handleAddComment} />
        </View>
      </KeyboardAvoidingView>
    </PrimaryBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardWrapper: {
    flex: 1,
  },
  list: {
    padding: 16,
    paddingBottom: 140, // space for footer
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    gap: 10,
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    borderRadius: 10,
    textAlignVertical: "top",
  },
});

export default Comments;
