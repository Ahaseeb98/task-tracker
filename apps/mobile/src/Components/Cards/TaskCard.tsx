import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../../Theme/ThemeProvider";
import { TASK_TYPE } from "../../../../../packages/Types/TASKS";
import { API_BASE_URL } from "../../Constants/API_ROUTES";
import { useNavigation } from "@react-navigation/native";
import { TASK_PATH } from "../../Navigation/Paths";

type TaskCardProps = {
  data: TASK_TYPE;
};

const TaskCard: React.FC<TaskCardProps> = ({ data }) => {
  const { navigate } = useNavigation();
  const { text, primary, primaryText, backgroundSecondary } = useTheme();

  return (
    <TouchableOpacity
      onPress={() =>
        navigate(
          // @ts-expect-error
          TASK_PATH as never,
          { id: data?._id }
        )
      }
      style={[styles.card, { backgroundColor: backgroundSecondary }]}
    >
      {data.picture && (
        <Image
          source={{ uri: API_BASE_URL + data.picture }}
          style={styles.pic}
        />
      )}
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: text }]}>{data.title}</Text>

            {data.description && (
              <Text style={[styles.description, { color: text }]}>
                {data.description}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.row}>
          {data.rewardPrice && (
            <Text style={[styles.description, { color: text }]}>
              Price: ${data.rewardPrice}
            </Text>
          )}

          {data.status && (
            <Text
              style={[
                styles.status,
                {
                  backgroundColor: primary,
                  color: primaryText,
                },
              ]}
            >
              {data.status.toUpperCase()}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    flexDirection: "row",
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pic: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 12,
  },
});

export default TaskCard;
