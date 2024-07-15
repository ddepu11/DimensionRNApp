import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";

import useTodosScreenLogic from "./Logic/useTodosScreenLogic";
import { Button, Header, InputBox, ScreenWrapper } from "../../Components";
import { FlashList } from "@shopify/flash-list";

const TodosScreen: FC = () => {
  const {
    content,
    onSubmit,
    user,
    todos,
    setContent,
    ToDoRenderItem,
    TodoEmptyComponent,
  } = useTodosScreenLogic();

  return (
    <ScreenWrapper>
      <View className="flex-1 pt-3 justify-between">
        <View className="flex-row justify-between items-center">
          <Text
            variant="headlineSmall"
            className="text-sm text-gray-700 font-bold"
          >
            Id: {user ? user : ""}
          </Text>

          <Button
            // disabled={isLogoutDisabled}
            text="Logout"
            className="bg-slate-500 rounded-sm px-2 py-1"
            textClassName="text-white text-sm text-center"
            // onPress={onSubmit}
          />
        </View>

        <View className="mt-2 w-full relative  h-4/5">
          <FlashList
            data={todos}
            scrollEnabled
            bounces={false}
            renderItem={ToDoRenderItem}
            estimatedItemSize={100}
            contentContainerStyle={{ paddingTop: 20 }}
            ListEmptyComponent={TodoEmptyComponent}
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
