import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";

import { TodoWithID } from "../../types";

type Props = {
  index: number;
  todo: TodoWithID;
  handleComplete: (todo: TodoWithID) => void;
  handleDeleteTodo: (todo: TodoWithID) => void;
};

const Todo: FC<Props> = ({ todo, handleComplete, handleDeleteTodo }) => {
  const { completed, content } = todo;
  // console.log("____todo", todo);

  const completeTodo = () => handleComplete({ ...todo, completed: !completed });
  const deleteTodod = () => handleDeleteTodo({ ...todo });

  return (
    <View className="mb-5 flex-row  justify-between rounded-lg">
      <View
        className={"flex-row pl-1 justify-start"}
        style={{ alignItems: "center" }}
      >
        <CheckBox
          disabled={false}
          value={completed}
          onValueChange={completeTodo}
          boxType="square"
          style={{ width: 20, height: 20 }}
        />

        <Text
          className="text-l ml-2"
          style={{
            width: "86%",
            textDecorationLine: `${completed ? "line-through" : undefined}`,
          }}
        >
          The problem is with the Fast refresh if you want to
        </Text>
      </View>

      <Pressable onPress={deleteTodod} className="justify-center">
        <Ionicons name="trash-bin-sharp" size={18} color="red" />
      </Pressable>
    </View>
  );
};

export default Todo;
