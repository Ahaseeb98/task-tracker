import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "../../Theme/ThemeProvider";

type Props = {
  visible: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

const ConfirmationModal: React.FC<Props> = ({
  visible,
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel,
  loading,
}) => {
  const { background, text, primary } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.container, { backgroundColor: background }]}>
              <Text style={[styles.title, { color: text }]}>{title}</Text>
              <Text style={[styles.message, { color: text }]}>{message}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={onCancel}
                  style={[styles.button, { borderColor: text }]}
                >
                  <Text style={{ color: text }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onConfirm}
                  style={[styles.button, { borderColor: primary }]}
                  disabled={loading}
                >
                  <Text style={{ color: primary }}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
});

export default ConfirmationModal;
