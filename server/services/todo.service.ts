import { TodoModelSchema, TodoModelName } from "@server/models/todo.model";
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";

class TodoService {
    private firestore: Firestore;

    constructor() {
        this.firestore = getFirestore();
    }

    public getItems = async () => {
        const items = await getDocs(collection(this.firestore, TodoModelName));
        return items;
    }

    public getItem = async (id: string) => {
        const item = doc(this.firestore, TodoModelName, id);
        return item
    }

    public addItem = async (item: TodoModelSchema) => {
        const itemRef = await addDoc(collection(this.firestore, TodoModelName), item);
        return itemRef;
    }

    public updateItem = async (itemId: string, item: TodoModelSchema) => {
        const itemRef = doc(this.firestore, TodoModelName, itemId);
        const updatedItem = await updateDoc(itemRef, item);
        return updatedItem;
    }

    public deleteItem = async (itemId: string) => {
        const deletedItem = await deleteDoc(doc(this.firestore, TodoModelName, itemId));
        return deletedItem;
    }
}

const todoService = new TodoService()
export default todoService