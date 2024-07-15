import React, { FC } from "react";
import { GestureResponderEvent, Pressable } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  text: string;
  onPress?: ((event: GestureResponderEvent) => void) | null;
};

const Button: FC<Props> = ({
  disabled = false,
  className,
  onPress,
  textClassName,
  text,
}) => {
  return (
    <Pressable disabled={disabled} className={className} onPress={onPress}>
      <Text className={textClassName}>{text}</Text>
    </Pressable>
  );
};

export default Button;
