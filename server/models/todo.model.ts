import { Timestamp } from "firebase/firestore";

export const TodoModelName = "todo";
export type TodoModelSchema = {
  title: string;
  description: string;
  completed: boolean;
  ownerId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
