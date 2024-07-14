import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { TodoWithID } from "../../types";

type Props = {
  index: number;
  todo: TodoWithID;
  handleComplete: (todo: TodoWithID) => void;
  handleDeleteTodo: (todo: TodoWithID) => void;
};

const Todo: FC<Props> = ({ index, todo, handleComplete, handleDeleteTodo }) => {
  const { completed, content, order } = todo;
  console.log("____todo", todo);

  const completeTodo = () => handleComplete({ ...todo, completed: !completed });
  const deleteTodod = () => handleDeleteTodo({ ...todo });

  return (
    <View className="mb-4 flex-row align-middle justify-between rounded-lg bg-slate-500 bottom-2">
      <View className={"flex-row"}>
        <Checkbox
          status={completed ? "checked" : "unchecked"}
          onPress={completeTodo}
        />
        <Text className="text-center text-2xl ml-2">{content}</Text>
      </View>

      <Pressable onPress={deleteTodod} className="justify-center">
        <Ionicons name="trash-bin-sharp" size={18} color="red" />
      </Pressable>
    </View>
  );
};

export default Todo;
