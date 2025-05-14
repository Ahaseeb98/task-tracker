import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryText from "../Texts/PrimaryText";

type CommentCardProps = {
  comment: {
    text: string;
    date: Date;
    by: string;
  };
};

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <View style={styles.card}>
      <PrimaryText style={styles.user}>{comment.by}</PrimaryText>
      <PrimaryText style={styles.text}>{comment.text}</PrimaryText>
      {comment.date && (
        <PrimaryText style={styles.date}>
          {new Date(comment.date).toLocaleString()}
        </PrimaryText>
      )}
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
});

export default CommentCard;
