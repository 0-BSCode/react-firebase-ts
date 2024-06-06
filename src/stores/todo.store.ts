import { Todo } from "@src/types/Todo";
import { create } from "zustand";

// null = no user is logged in
// undefined = no user is set (used in case Firebase is still fetching user info)
type Store = {
  todoItems: Todo[];
  setTodoItems: (value: Todo[]) => void;
};

const useTodoStore = create<Store>()((set) => ({
  todoItems: [],
  setTodoItems: (value: Todo[]) => set({ todoItems: value })
}));

export default useTodoStore;
