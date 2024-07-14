import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Keyboard, KeyboardType } from "react-native";
import { useCallback, useState } from "react";
import { nanoid } from "nanoid";

type IdType = undefined | "EMAIL" | "PHONE" | "GENERATE" | "CUSTOM";

const useHomeScreenLogic = () => {
  const [idType, setIdType] = useState<IdType>("GENERATE");

  const [uniqueId, setUniqueId] = useState("");
  const navigation = useNavigation();

  const onSubmit = () => {
    Keyboard.dismiss();
    if (uniqueId) {
      AsyncStorage.setItem("userID", uniqueId);

      navigation.navigate("Todos", { uniqueId });
    }
  };

  let typeOfKeyboard: KeyboardType | undefined = undefined;

  if (idType === "EMAIL") {
    typeOfKeyboard = "email-address";
  } else if (idType === "PHONE") {
    typeOfKeyboard = "number-pad";
  } else if (idType === "CUSTOM") {
    typeOfKeyboard = "default";
  }

  const selectEmail = () => setIdType("EMAIL");
  const selectPhone = () => setIdType("PHONE");
  const selectCustom = () => setIdType("CUSTOM");
  const selectGenerateRadom = () => setIdType("GENERATE");

  useFocusEffect(
    useCallback(() => {
      if (idType === "GENERATE") {
        setUniqueId(nanoid());
      } else {
        setUniqueId("");
      }
    }, [idType])
  );

  let placeholder = "";
  if (idType === "EMAIL") {
    placeholder = "Please eneter your email";
  } else if (idType === "PHONE") {
    placeholder = "Please eneter your phone";
  } else if (idType === "CUSTOM") {
    placeholder = "Please eneter your unique id";
  }

  const handleChangeUniqueId = (e: string) => setUniqueId(e);

  return {
    typeOfKeyboard,
    selectCustom,
    selectEmail,
    selectGenerateRadom,
    selectPhone,
    handleChangeUniqueId,
    placeholder,
    idType,
    onSubmit,
    uniqueId,
  };
};

export default useHomeScreenLogic;
