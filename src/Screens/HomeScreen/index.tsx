import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { FC } from "react";

import { CustomRadioButton, InputBox, ScreenWrapper } from "../../Components";
import useHomeScreenLogic from "./Logic/useHomeScreenLogic";

const HomeScreen: FC = () => {
  const {
    handleChangeUniqueId,
    idType,
    onSubmit,
    placeholder,
    selectCustom,
    selectEmail,
    selectGenerateRadom,
    selectPhone,
    typeOfKeyboard,
    uniqueId,
    uniqueIdRef,
  } = useHomeScreenLogic();

  return (
    <ScreenWrapper>
      <View className="flex-1 pt-5">
        <Text variant="headlineSmall" className="text-3xl">
          Select one of these for your unique id{" "}
        </Text>

        {/* Radio Buttons  */}
        <View className="mt-5 justify-between">
          <CustomRadioButton
            value={"EMAIL"}
            label="Enter email"
            isChecked={idType === "EMAIL"}
            onSelect={selectEmail}
          />

          <CustomRadioButton
            value={"PHONE"}
            label="Enter phone"
            isChecked={idType === "PHONE"}
            onSelect={selectPhone}
          />

          <CustomRadioButton
            value={"CUSTOM"}
            label="Enter custom"
            isChecked={idType === "CUSTOM"}
            onSelect={selectCustom}
          />

          <CustomRadioButton
            value={"GENERATE"}
            label="Generate random"
            isChecked={idType === "GENERATE"}
            onSelect={selectGenerateRadom}
          />
        </View>

        <InputBox
          isDisabled={idType === "GENERATE"}
          keyboardType={typeOfKeyboard}
          value={uniqueId}
          onChangeText={handleChangeUniqueId}
          placeholder={placeholder}
          className="mt-7 rounded-md w-full"
        />

        <Pressable
          disabled={!uniqueId}
          className="bg-slate-500 p-3 mt-10 rounded-sm"
          onPress={onSubmit}
        >
          <Text
            className="text-white text-xl"
            style={{ fontSize: 18, textAlign: "center" }}
          >
            Submit
          </Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;
