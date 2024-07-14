import React, { FC } from "react";
import { Keyboard, Pressable, TextInput, View } from "react-native";

import useTodosScreenLogic from "./Logic/useTodosScreenLogic";
import { Header, ScreenWrapper } from "../../Components";
import { Text } from "react-native-paper";

const TodosScreen: FC = () => {
  const {
    content,
    onSubmit,
    user,
    todos,
    handleComplete,
    handleDeleteTodo,
    setContent,
  } = useTodosScreenLogic();

  return (
    <ScreenWrapper>
      <View className="flex-1 pt-5 ">
        <Text variant="headlineSmall" className="text-sm">
          Unique Id: {user ? user : ""}
        </Text>

        <Header />

        <View
          style={{
            marginTop: 25,
            width: "100%",
          }}
        >
          {todos &&
            todos.map(([k, v]) => (
              <View
                key={k}
                style={{
                  marginBottom: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "black", fontSize: 16 }}>{v.order}</Text>
                <Text style={{ color: "black", fontSize: 20 }}>
                  {v.content}:
                </Text>

                <Text style={{ color: "black", fontSize: 16 }}>
                  {v?.completed ? "Completed" : "N Completed"}
                </Text>

                <Pressable
                  style={{
                    backgroundColor: "#8888",
                    borderRadius: 5,
                    padding: 5,
                  }}
                  onPress={() =>
                    handleComplete({ ...v, completed: !v?.completed })
                  }
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    {v?.completed ? "Un Complet" : "Complet it"}
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "#8888",
                    borderRadius: 5,
                    padding: 5,
                  }}
                  onPress={() => handleDeleteTodo({ ...v })}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    delete
                  </Text>
                </Pressable>
              </View>
            ))}
        </View>

        <View className="flex-row justify-between absolute bottom-0 left-0 right-0">
          <TextInput
            onBlur={() => {
              Keyboard.dismiss();
            }}
            style={{
              fontSize: 20,
              borderRadius: 5,
              borderColor: "#333",
              borderWidth: 0.4,
              marginBottom: 10,
              padding: 5,
            }}
            value={content}
            onChangeText={(e) => {
              setContent(e);
            }}
            placeholder="Please enter message"
            autoCapitalize="none"
          />
          <Pressable
            style={{ backgroundColor: "#8888", borderRadius: 5, padding: 5 }}
            onPress={onSubmit}
          >
            <Text style={{ color: "black", fontSize: 18, textAlign: "center" }}>
              Submit
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default TodosScreen;
