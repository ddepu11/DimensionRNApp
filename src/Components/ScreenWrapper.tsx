import { StatusBar } from "expo-status-bar";
import React, { FC, PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />

      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
