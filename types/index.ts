export type Todo = {
  content: string;
  order: number;
  completed: boolean;
  deleted: boolean;
};

export type TodoWithID = Todo & { id: string };
