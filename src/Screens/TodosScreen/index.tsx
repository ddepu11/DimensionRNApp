import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";

import useTodosScreenLogic from "./Logic/useTodosScreenLogic";
import { Header, InputBox, ScreenWrapper } from "../../Components";
import { FlashList } from "@shopify/flash-list";

const TodosScreen: FC = () => {
  const {
    content,
    onSubmit,
    user,
    todos,
    handleComplete,
    handleDeleteTodo,
    setContent,
    ToDoRenderItem,
  } = useTodosScreenLogic();

  return (
    <ScreenWrapper>
      <View className="flex-1 pt-5">
        <Text variant="headlineSmall" className="text-sm">
          Unique Id: {user ? user : ""}
        </Text>

        <Header />

        <View className="mt-2 w-full relative  h-3/4">
          <FlashList
            data={todos}
            scrollEnabled
            bounces={false}
            renderItem={ToDoRenderItem}
            estimatedItemSize={100}
            contentContainerStyle={{ paddingTop: 20 }}
          />
        </View>

        <View className="flex-row justify-between align-middle">
          <InputBox
            keyboardType={"default"}
            value={content}
            onChangeText={setContent}
            placeholder={"What do you want to do?"}
            className="w-72"
          />

          <Pressable
            className="bg-white rounded-md w-12 flex justify-center border-2 border-slate-300"
            onPress={onSubmit}
          >
            <Text className="text-center text-4xl">+</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default TodosScreen;
