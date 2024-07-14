import { Pressable, View } from "react-native";
import { FC } from "react";
import { ScreenWrapper } from "../../Components";
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
  } = useHomeScreenLogic();

  return (
    <ScreenWrapper>
      <View className="flex-1 pt-5">
        <Text variant="headlineSmall" className="text-3xl">
          Select one of these for your unique id{" "}
        </Text>

        <View className="mt-5 justify-between">
          <Pressable className="flex-row items-center" onPress={selectEmail}>
            <Text variant="labelLarge" className="text-lg">
              Enter email
            </Text>
            <RadioButton
              value="EMAIL"
              status={idType === "EMAIL" ? "checked" : "unchecked"}
              onPress={selectEmail}
            />
          </Pressable>

          <Pressable className="flex-row items-center" onPress={selectPhone}>
            <Text variant="labelLarge" className="text-lg">
              Enter phone
            </Text>
            <RadioButton
              value="PHONE"
              status={idType === "PHONE" ? "checked" : "unchecked"}
              onPress={selectPhone}
            />
          </Pressable>

          <Pressable className="flex-row items-center" onPress={selectCustom}>
            <Text variant="labelLarge" className="text-lg">
              Enter custom
            </Text>
            <RadioButton
              value="CUSTOM"
              status={idType === "CUSTOM" ? "checked" : "unchecked"}
              onPress={selectCustom}
            />
          </Pressable>

          <Pressable
            className="flex-row items-center"
            onPress={selectGenerateRadom}
          >
            <Text variant="labelLarge" className="text-lg">
              Generate random
            </Text>
            <RadioButton
              value="GENERATE"
              status={idType === "GENERATE" ? "checked" : "unchecked"}
              onPress={selectGenerateRadom}
            />
          </Pressable>
        </View>

        <TextInput
          className="mt-7 rounded-sm p-0"
          mode="outlined"
          disabled={idType === "GENERATE"}
          keyboardType={typeOfKeyboard}
          value={uniqueId}
          onChangeText={handleChangeUniqueId}
          placeholder={placeholder}
          autoCapitalize={"none"}
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
