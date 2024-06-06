import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { Todo } from "@src/types/Todo";
import { DeleteOutlined } from "@mui/icons-material";
import useAuthStore from "@src/stores/auth.store";
import todoController from "@server/controllers/todo.controller";
import useTodoStore from "@src/stores/todo.store";
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum";
import { User } from "firebase/auth";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const authStore = useAuthStore();
  const todoStore = useTodoStore();
  const user = authStore.user as User;
  const handleDelete = async (id: string) => {
    const res = await todoController.deleteOne(id, user.uid);
    if (res.status === ResponseStatusEnum.SUCCESS) {
      const items = todoStore.todoItems.filter((item) => item.id !== id);
      todoStore.setTodoItems(items);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: boolean) => {
    const res = await todoController.updateOneStatus(id, newStatus, user.uid);
    if (res.status === ResponseStatusEnum.SUCCESS) {
      const items = todoStore.todoItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: newStatus
          };
        }
        return item;
      });
      todoStore.setTodoItems(items);
    }
  };

  return (
    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} padding={5}>
      <Box display={"flex"} flexDirection={"row"}>
        <Checkbox checked={todo.completed} onChange={() => handleStatusUpdate(todo.id, !todo.completed)} />
        <Box display={"flex"} flexDirection={"column"}>
          <Typography>{todo.title}</Typography>
          <Typography>{todo.description}</Typography>
        </Box>
      </Box>
      <IconButton onClick={() => handleDelete(todo.id)}>
        <DeleteOutlined />
      </IconButton>
    </Box>
  );
};

export default TodoItem;
