import { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import { Keyboard, Pressable, View } from "react-native";
import { Replicache, WriteTransaction } from "replicache";
import {
  createReplicacheExpoSQLiteExperimentalCreateKVStore,
  newGenericDb,
} from "@react-native-replicache/react-native-expo-sqlite";
import { useSubscribe } from "replicache-react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pusher, PusherEvent } from "@pusher/pusher-websocket-react-native";
import { Todo, TodoWithID } from "../../../../types";
import TodoComponent from "../../../Components/Todo";
import { Text } from "react-native-paper";

const VITE_PUBLIC_REPLICHAT_PUSHER_KEY = "7bd83beeb647bd419630";
const VITE_PUBLIC_REPLICHAT_PUSHER_CLUSTER = "ap2";

type ToDoListItemType = {
  item: [string, TodoWithID];
};

const useTodosScreenLogic = () => {
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (newGenericDb) {
          // newGenericDb.destroy();
          // newGenericDb.close();
        }
      };
    }, [])
  );

  const route = useRoute();

  const licenseKey = "l704b192f22514ec4a563ab1400eab5fa";

  if (!licenseKey) {
    throw new Error("Missing REPLICACHE_LICENSE_KEY");
  }

  const [r, setR] = useState<Replicache<any> | null>(null);

  useEffect(() => {
    // console.log("updating replicache");
    const r = new Replicache({
      name: route.params?.uniqueId,
      licenseKey,
      mutators: {
        async createTodo(
          tx: WriteTransaction,
          { id, content, order }: TodoWithID
        ) {
          await tx.set(`todo/${id}`, {
            content,
            order,
          });
        },

        async updateTodo(tx: WriteTransaction, todo: TodoWithID) {
          const { id } = todo;
          const prev = await tx.get<Todo>(`todo/${id}`);
          const next = { ...prev, ...todo };

          await tx.set(`todo/${id}`, next);
        },

        async deleteTodo(tx: WriteTransaction, id: string) {
          const res = await tx.del(`todo/${id}`);
          console.log("______RES", res, id);
        },
      },
      pushURL: `http://127.0.0.1:9000/api/replicache/push`,
      pullURL: `http://127.0.0.1:9000/api/replicache/pull`,
      experimentalCreateKVStore:
        createReplicacheExpoSQLiteExperimentalCreateKVStore,
      logLevel: "error",
    });
    setR(r);
    listen(r);
    return () => {
      void r.close();
    };
  }, [route.params]);

  const todos = useSubscribe(
    r,
    async (tx) => {
      const list = await tx.scan<Todo>({ prefix: "todo/" }).entries().toArray();
      list.sort(([, { order: a }], [, { order: b }]) => a - b);
      return list;
    },
    []
  );

  const [content, setContent] = useState<string>("");

  const onSubmit = async () => {
    let last: Todo | null = null;
    if (todos.length) {
      const lastMessageTuple = todos[todos.length - 1];
      last = lastMessageTuple[1];
    }
    const order = (last?.order ?? 0) + 1;

    await r?.mutate.createTodo({
      id: new Date().getTime(),
      content,
      order,
    });

    if (content) {
      setContent("");
    }
    Keyboard.dismiss();
  };

  const [user, setUser] = useState("");

  useMemo(async () => {
    try {
      const value = await AsyncStorage.getItem("userID");
      // console.log("_____________USERNAME", value);
      if (value !== null) {
        setUser(value);
        return value;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }, []);

  const handleDeleteTodo = async (todo: TodoWithID) => {
    console.log("_____handle DELETE", todo);
    await r?.mutate.deleteTodo(todo.id);
  };

  const handleUpdateTodo = async (todo: TodoWithID) => {
    await r?.mutate.updateTodo(todo);

    if (content) {
      setContent("");
    }
    Keyboard.dismiss();
  };

  const handleComplete = async (todo: TodoWithID) => {
    await r?.mutate.updateTodo(todo);
  };

  const listen = async (rep: Replicache) => {
    console.log("listening");

    if (
      !VITE_PUBLIC_REPLICHAT_PUSHER_KEY ||
      !VITE_PUBLIC_REPLICHAT_PUSHER_CLUSTER
    ) {
      throw new Error("Missing PUSHER_KEY or PUSHER_CLUSTER in env");
    }

    try {
      const pusher = Pusher.getInstance();

      await pusher.init({
        apiKey: VITE_PUBLIC_REPLICHAT_PUSHER_KEY,
        cluster: VITE_PUBLIC_REPLICHAT_PUSHER_CLUSTER,
      });

      await pusher.connect();

      await pusher.subscribe({
        channelName: "default",
        onEvent: async (event: PusherEvent) => {
          console.log(`Event received: ${event.eventName}`);
          if (event.eventName === "poke") {
            await rep.pull();
          }
        },
      });
    } catch (err) {
      console.log("_________err", err);
    }
  };

  const ToDoRenderItem = ({
    index,
    item,
  }: {
    index: number;
    item: ToDoListItemType;
  }) => {
    return (
      <TodoComponent
        index={index}
        todo={item[1]}
        handleComplete={handleComplete}
        handleDeleteTodo={handleDeleteTodo}
      />
    );
  };

  const TodoEmptyComponent = () => {
    return (
      <Text className="text-center	text-xl">Your to do list is empty!</Text>
    );
  };

  return {
    content,
    onSubmit,
    user,
    todos,
    handleComplete,
    handleDeleteTodo,
    setContent,
    ToDoRenderItem,
    TodoEmptyComponent,
  };
};

export default useTodosScreenLogic;
