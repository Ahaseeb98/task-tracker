import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryText from "../Texts/PrimaryText";
import { useTheme } from "../../Theme/ThemeProvider";
import { USER_TYPE } from "../../../../../packages/Types/USERS";

type CommentCardProps = {
  comment: {
    text: string;
    status: string;
    date: Date;
    by: USER_TYPE;
  };
};

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const { text, backgroundSecondary } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: backgroundSecondary }]}>
      <PrimaryText style={styles.user}>{comment.by.name}</PrimaryText>
      <PrimaryText style={[styles.text, { color: text }]}>
        {comment.text}
      </PrimaryText>
      <View style={styles.row}>
        <PrimaryText style={[styles.text, { color: text }]}>
          {comment.status || "Pending"}
        </PrimaryText>
        {comment.date && (
          <PrimaryText style={styles.date}>
            {new Date(comment.date).toLocaleString()}
          </PrimaryText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: "#f4f4f4",
  },
  user: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default CommentCard;
