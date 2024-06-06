export const TodoModelName = "todo";
export type TodoModelSchema = {
  title: string;
  description: string;
  completed: boolean;
  ownerId: string;
};
