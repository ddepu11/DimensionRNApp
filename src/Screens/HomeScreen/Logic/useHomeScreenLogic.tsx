import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Keyboard, KeyboardType, TextInput } from "react-native";
import { useCallback, useRef, useState } from "react";
import { nanoid } from "nanoid";

type IdType = undefined | "EMAIL" | "PHONE" | "GENERATE" | "CUSTOM";

const useHomeScreenLogic = () => {
  const [idType, setIdType] = useState<IdType>("GENERATE");

  const [uniqueId, setUniqueId] = useState("");
  const uniqueIdRef = useRef<undefined | TextInput>();

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

  const focusUniqueIdInputBox = () => {
    uniqueIdRef.current?.focus();
  };

  const selectEmail = () => {
    // focusUniqueIdInputBox();
    setIdType("EMAIL");
  };
  const selectPhone = () => {
    // focusUniqueIdInputBox();
    setIdType("PHONE");
  };
  const selectCustom = () => {
    // focusUniqueIdInputBox();
    setIdType("CUSTOM");
  };
  const selectGenerateRadom = () => {
    Keyboard.dismiss();
    setIdType("GENERATE");
  };

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
    uniqueIdRef,
  };
};

export default useHomeScreenLogic;
