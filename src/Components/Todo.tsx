import React, { FC, useRef, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";

import { TodoWithID } from "../../types";
import UpdateTodo from "./UpdateTodo";

type Props = {
  index: number;
  todo: TodoWithID;
  handleComplete: (todo: TodoWithID) => void;
  handleDeleteTodo: (todo: TodoWithID) => void;
  handleUpdateTodo: (todo: TodoWithID) => void;
};

const Todo: FC<Props> = ({
  todo,
  handleComplete,
  handleDeleteTodo,
  handleUpdateTodo,
}) => {
  const [openUpodateModal, setOpenUpodateModal] = useState(false);

  const { completed, content } = todo;

  const completeTodo = () => handleComplete({ ...todo, completed: !completed });
  const deleteTodod = () => handleDeleteTodo({ ...todo });

  const flag = useRef(true);

  const checkBoxOnTouchEnd = (e: GestureResponderEvent) => {
    closeModal();
  };

  const openModal = () => {
    setOpenUpodateModal(true);
  };
  const closeModal = () => {
    setOpenUpodateModal(false);
  };

  const updateToDo = (content: string) => {
    handleUpdateTodo({ ...todo, content });
  };

  return (
    <>
      <Pressable
        className="mb-4 flex-row justify-between rounded-2xl border-2 border-gray-200 bg-white p-3"
        style={styles.boxShadow}
        onPress={openModal}
      >
        <View className={"flex-row justify-start items-center"}>
          <CheckBox
            disabled={false}
            value={completed}
            onTouchEnd={checkBoxOnTouchEnd}
            onValueChange={completeTodo}
            boxType="square"
            style={{ width: 20, height: 20, zIndex: 9999 }}
          />

          <Text
            className="text-l ml-2"
            style={{
              width: "86%",
              textDecorationLine: `${completed ? "line-through" : undefined}`,
            }}
          >
            {content}
          </Text>
        </View>

        <Ionicons
          onPress={deleteTodod}
          name="trash-bin-sharp"
          size={20}
          color="red"
        />
      </Pressable>

      <UpdateTodo
        visible={openUpodateModal}
        closeModal={closeModal}
        conent={content}
        updateToDo={updateToDo}
      />
    </>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default Todo;
