import React, { FC } from "react";
import { Pressable } from "react-native";
import { RadioButton, Text } from "react-native-paper";

type Props = {
  onSelect: () => void;
  label: string;
  isChecked: boolean;
  value: string;
};

const CustomRadioButton: FC<Props> = ({
  onSelect,
  label,
  isChecked = false,
  value = "",
}) => {
  return (
    <Pressable className="flex-row items-center" onPress={onSelect}>
      <Text variant="labelLarge" className="text-lg">
        {label}
      </Text>
      <RadioButton
        value={value}
        status={isChecked ? "checked" : "unchecked"}
        onPress={onSelect}
      />
    </Pressable>
  );
};

export default CustomRadioButton;
