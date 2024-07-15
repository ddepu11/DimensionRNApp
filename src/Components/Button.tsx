import React, { FC } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Text } from "react-native-paper";

type Props = {
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  text: string;
  onPress?: ((event: GestureResponderEvent) => void) | null;
  style?: StyleProp<ViewStyle>;
};

const Button: FC<Props> = ({
  disabled = false,
  className,
  onPress,
  textClassName,
  text,
  style,
}) => {
  return (
    <Pressable
      disabled={disabled}
      className={className}
      onPress={onPress}
      style={style}
    >
      <Text className={textClassName}>{text}</Text>
    </Pressable>
  );
};

export default Button;
