import { SafeAreaView } from "react-native-safe-area-context";
import React, { FC, PropsWithChildren } from "react";
import { Keyboard, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  // When user presses out side of any input box close the keyboard
  const closeKeyboard = () => Keyboard.dismiss();

  return (
    <SafeAreaView className="flex-1 px-5">
      <Pressable className="flex-1" onPress={closeKeyboard}>
        <KeyboardAwareScrollView extraHeight={120} enableOnAndroid>
          <StatusBar style="auto" />

          {children}
        </KeyboardAwareScrollView>
      </Pressable>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
