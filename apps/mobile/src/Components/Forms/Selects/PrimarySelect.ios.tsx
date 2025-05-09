import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../../Theme/ThemeProvider";
import PrimaryText from "../../Texts/PrimaryText";

type CustomPickerProps = {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
  placeholder?: string;
  style?: any;
  error?: string;
};

const CustomPicker: React.FC<CustomPickerProps> = ({
  selectedValue,
  onValueChange,
  items,
  placeholder,
  style,
  error,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { text, background, danger } = useTheme();

  // Toggle modal visibility
  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <View style={[styles.container, style]}>
      {/* Trigger to open modal */}
      <TouchableOpacity
        style={[styles.input, { backgroundColor: background }]}
        onPress={toggleModal}
      >
        <Text
          style={[
            styles.inputText,
            {
              color: items.find((item) => item.value === selectedValue)?.label
                ? text
                : text + "90",
            },
          ]}
        >
          {selectedValue
            ? items.find((item) => item.value === selectedValue)?.label
            : placeholder || "Select an option"}
        </Text>
      </TouchableOpacity>

      {/* Modal for iOS */}
      {Platform.OS === "ios" && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPressOut={toggleModal}
          >
            <View style={styles.modalContent}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
              >
                <Picker.Item label={"Please Select"} value={""} />
                {items.map((item) => (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Picker>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
      {error ? (
        <PrimaryText style={[styles.errorLabel, { color: danger }]}>
          {error}
        </PrimaryText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    // alignItems: "center",
  },
  inputText: {
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "80%",
    padding: 20,
  },
  errorLabel: {
    marginTop: 4,
    fontSize: 14,
  },
});

export default CustomPicker;
