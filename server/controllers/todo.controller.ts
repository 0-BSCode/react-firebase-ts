import { TodoModelSchema, TodoModelName } from "@server/models/todo.model";
import { collection, addDoc, Firestore, getFirestore } from "firebase/firestore";

// Input validation, sanitization, and role validation
class TodoController {
  private firestore: Firestore;
  constructor() {
    this.firestore = getFirestore();
  }
  public addItem = async (item: TodoModelSchema) => {
    const itemRef = await addDoc(collection(this.firestore, TodoModelName), item);
    return itemRef;
  };
}

const todoController = new TodoController();
export default todoController;
