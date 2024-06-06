import authController from "@server/controllers/auth.controller";
import todoController from "@server/controllers/todo.controller";
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum";
import TodoItem from "@src/components/molecules/TodoItem";
import useAuthStore from "@src/stores/auth.store";
import useTodoStore from "@src/stores/todo.store";
import { Todo } from "@src/types/Todo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const todoStore = useTodoStore();
  const [todo, setTodo] = useState({
    title: "",
    description: ""
  });
  const handleSignout = async () => {
    const res = await authController.signOut();
    if (res.status === ResponseStatusEnum.SUCCESS) {
      authStore.setUser(null);
      navigate("/login");
    }
  };

  const handleCreate = async () => {
    if (authStore.user) {
      const res = await todoController.create(todo.title, todo.description, authStore.user?.uid);

      if (res.status === ResponseStatusEnum.SUCCESS) {
        const newItem = res.body as Todo;
        todoStore.setTodoItems([...todoStore.todoItems, newItem]);
      }
    }
  };

  useEffect(() => {
    if (authStore.user) {
      todoController.getByUserId(authStore.user.uid).then((res) => {
        if (res.status === ResponseStatusEnum.SUCCESS) {
          todoStore.setTodoItems(res.body as Todo[]);
        }
      });
    }
  }, [authStore.user]);

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleSignout}>Sign Out</button>

      <input
        type="text"
        placeholder="title"
        value={todo.title}
        onChange={(e) => {
          setTodo({ ...todo, title: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="description"
        value={todo.description}
        onChange={(e) => {
          setTodo({ ...todo, description: e.target.value });
        }}
      />
      <button onClick={handleCreate}>Create</button>

      <div>
        {todoStore.todoItems.map((item) => {
          return <TodoItem key={item.id} todo={item} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
