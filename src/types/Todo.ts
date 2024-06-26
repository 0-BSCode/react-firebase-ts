import { TodoModelSchema } from "@server/models/todo.model";

export type Todo = TodoModelSchema & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
