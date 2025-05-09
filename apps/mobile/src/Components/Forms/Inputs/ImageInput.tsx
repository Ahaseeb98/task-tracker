import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import PrimaryButton from "../../Buttons/PrimaryButton";
import { useTheme } from "../../../Theme/ThemeProvider";

type ImageInputProps = {
  onImagePicked: (uri: string) => void;
  label?: string;
  style?: any;
  imageStyle?: any;
};

const ImageInput: React.FC<ImageInputProps> = ({
  onImagePicked,
  label = "Pick an image",
  style,
  imageStyle,
}) => {
  const { background, text } = useTheme();
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need permission to access your media library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setImageUri(selectedAsset.uri);
      onImagePicked(selectedAsset.uri);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <PrimaryButton
        title="Select Profile Image"
        style={{
          ...styles.button,
          ...{ backgroundColor: background, borderColor: text },
        }}
        textStyle={{ ...{ color: text }, ...styles.btnText }}
        onPress={handlePickImage}
      />

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={[styles.imagePreview, imageStyle]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
  },
  button: {
    alignItems: "flex-start",
    borderWidth: 1,
    paddingLeft: 10,
  },

  imagePreview: {
    width: 150,
    height: 150,
    marginTop: 12,
    borderRadius: 8,
    resizeMode: "cover",
  },
  btnText: {
    fontFamily: "Inter_400Regular",
  },
});

export default ImageInput;
