import React, { FC, useState } from "react";
import { Modal, View } from "react-native";
import { Text } from "react-native-paper";
import Button from "./Button";
import InputBox from "./InputBox";

type Props = {
  visible: boolean;
  closeModal: () => void;
  conent: string;
  updateToDo: (content: string) => void;
};

const UpdateTodo: FC<Props> = ({ visible, closeModal, conent, updateToDo }) => {
  const [updatedContent, setUpdatedContent] = useState(conent);

  const handleChangeText = (text: string) => {
    setUpdatedContent(text);
  };

  const handlePressUpdate = () => {
    updateToDo(updatedContent);
    closeModal();
  };

  return (
    <Modal visible={visible} onRequestClose={closeModal} transparent={true}>
      <View
        className=" flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        <View className="bg-slate-50 rounded-md p-3 " style={{ width: "90%" }}>
          <Button
            text="close"
            className="bg-red-400 px-1 py-1 justify-center items-center rounded-md "
            textClassName="text-lg text-white"
            onPress={closeModal}
          />

          <Text
            variant="headlineSmall"
            className="text-gray-700 font-semibold text-xl mt-10 mb-5 text-center"
          >
            Update ToDo
          </Text>

          <InputBox
            keyboardType={"default"}
            value={updatedContent}
            onChangeText={handleChangeText}
            className="w-full p-0 mb-3"
          />

          <Button
            // disabled={isLogoutDisabled}
            text="Update"
            className="bg-slate-500 rounded-sm py-2 mt-4"
            textClassName="text-white text-lg text-center"
            onPress={handlePressUpdate}
          />
        </View>
      </View>
    </Modal>
  );
};

export default UpdateTodo;
