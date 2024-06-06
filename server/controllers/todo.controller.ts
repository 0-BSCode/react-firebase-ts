import { TodoModelSchema, TodoModelName } from "@server/models/todo.model";
import todoService from "@server/services/todo.service";
import { ResponseI } from "@server/types/ResponseI";
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum";
import { Todo } from "@src/types/Todo";
import { collection, addDoc, Firestore, getFirestore, Timestamp } from "firebase/firestore";
import { z } from "zod";

// Input validation, sanitization, and role validation
class TodoController {
  private firestore: Firestore;
  constructor() {
    this.firestore = getFirestore();
  }

  public getByUserId = async (userId: string) => {
    try {
      const items = await todoService.getItems();
      const filteredItems = items.docs.filter((item) => item.data().ownerId === userId);
      const todoItems = filteredItems.map((item) => {
        const itemData = item.data() as TodoModelSchema;
        return {
          id: item.id,
          ...itemData,
          createdAt: itemData.createdAt.toDate(),
          updatedAt: itemData.createdAt.toDate()
        } as Todo;
      });

      return {
        status: ResponseStatusEnum.SUCCESS,
        body: todoItems.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      } as ResponseI<Todo[]>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };

  public create = async (title: string, description: string, userId: string) => {
    try {
      const todoSchema = z.object({
        title: z.string().max(20),
        description: z.string(),
        userId: z.string()
      });

      todoSchema.parse({ title, description, userId });
      const newTodo: TodoModelSchema = {
        title,
        description,
        ownerId: userId,
        completed: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      const itemRef = await addDoc(collection(this.firestore, TodoModelName), newTodo);
      const item = await todoService.getItem(itemRef.id);
      const itemData = item.data() as TodoModelSchema;
      if (!itemData) {
        throw new Error("Error creating todo item");
      }

      return {
        status: ResponseStatusEnum.SUCCESS,
        body: {
          id: itemRef.id,
          ...itemData,
          createdAt: itemData.createdAt.toDate(),
          updatedAt: itemData.updatedAt.toDate()
        }
      } as ResponseI<Todo>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };

  public updateOneStatus = async (id: string, newStatus: boolean, userId: string) => {
    try {
      const item = await todoService.getItem(id);
      const itemData = item.data();

      if (!itemData) {
        throw new Error("Document not found");
      } else if (itemData.ownerId !== userId) {
        throw new Error("Not authorized to update this item");
      }

      const updatedItem: TodoModelSchema = {
        completed: newStatus,
        description: itemData.description,
        title: itemData.title,
        ownerId: itemData.ownerId,
        updatedAt: Timestamp.now(),
        createdAt: itemData.createdAt
      };

      await todoService.updateItem(id, updatedItem);
      return {
        status: ResponseStatusEnum.SUCCESS,
        body: id
      } as ResponseI<string>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };

  public deleteOne = async (id: string, userId: string) => {
    try {
      const item = await todoService.getItem(id);
      if (item.data()?.ownerId !== userId) {
        throw new Error("Not authorized to delete this item");
      }
      await todoService.deleteItem(id);
      return {
        status: ResponseStatusEnum.SUCCESS,
        body: id
      } as ResponseI<string>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };
}

const todoController = new TodoController();
export default todoController;
