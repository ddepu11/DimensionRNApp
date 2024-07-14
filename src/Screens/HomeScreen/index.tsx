import { Pressable, View } from "react-native";
import { FC } from "react";
import { CustomRadioButton, ScreenWrapper } from "../../Components";
import useHomeScreenLogic from "./Logic/useHomeScreenLogic";
import { RadioButton, Text, TextInput } from "react-native-paper";

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

        <TextInput
          ref={uniqueIdRef}
          className="mt-7 rounded-sm p-0"
          mode="outlined"
          disabled={idType === "GENERATE"}
          keyboardType={typeOfKeyboard}
          value={uniqueId}
          onChangeText={handleChangeUniqueId}
          placeholder={placeholder}
          autoCapitalize="none"
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
