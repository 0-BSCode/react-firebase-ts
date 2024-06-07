import authController from "@server/controllers/auth.controller";
import todoController from "@server/controllers/todo.controller";
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum";
import useAuthStore from "@src/stores/auth.store";
import useTodoStore from "@src/stores/todo.store";
import { Todo } from "@src/types/Todo";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Side from "@src/components/SideBar";
import SearchBar from "@src/components/SearchBar";
import EventCard from "@src/components/EventCard";
import { Box } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const todoStore = useTodoStore();
  const user = authStore.user as User;

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
    const res = await todoController.create(todo.title, todo.description, user.uid);

    if (res.status === ResponseStatusEnum.SUCCESS) {
      const newItem = res.body as Todo;
      todoStore.setTodoItems([newItem, ...todoStore.todoItems]);
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
    <div style={{ display: "flex", height: "100vh" }}>
      <Side style={{ flex: "0 0 200px" }} />
      <div style={{ flex: 1, padding: "20px" }}>
        <SearchBar />

        <Box padding={4}>
          <EventCard EventName="Event 1" desc="Description" loc="Cebu City" points="100 Points" />
        </Box>

        {/* <div style={{ flex: 1, padding: "20px", }}>
      <SlideshowTwoTone />
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
      </div> */}
      </div>
    </div>
  );
};

export default HomePage;
