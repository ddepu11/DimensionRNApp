import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { KeyboardType } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  isDisabled?: boolean;
  keyboardType?: KeyboardType;
  value?: string;
  placeholder?: string;
  onChangeText?: (e: string) => void;
  className?: string;
};

const InputBox: ForwardRefRenderFunction<typeof TextInput, Props> = (
  {
    isDisabled = false,
    keyboardType,
    value,
    onChangeText,
    placeholder,
    className,
  },
  ref
) => {
  return (
    <TextInput
      ref={ref}
      className={className}
      mode="outlined"
      disabled={isDisabled}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      autoCapitalize="none"
    />
  );
};

export default forwardRef(InputBox);
