import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import PrimaryText, { PrimaryTextProps } from "./PrimaryText";

const TouchableText = ({
  onPress,
  ...props
}: TouchableOpacityProps & PrimaryTextProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <PrimaryText {...props} />
    </TouchableOpacity>
  );
};

export default TouchableText;
