import { SafeAreaView } from "react-native-safe-area-context";
import React, { FC, PropsWithChildren } from "react";
import { Keyboard, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

const ScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  // When user presses out side of any input box close the keyboard
  const closeKeyboard = () => Keyboard.dismiss();

  return (
    <SafeAreaView className="flex-1 px-2">
      <Pressable className="flex-1" onPress={closeKeyboard}>
        <StatusBar style="auto" />

        {children}
      </Pressable>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
