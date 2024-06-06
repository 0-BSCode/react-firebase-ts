import { TodoModel, TodoModelName } from "@server/models/TodoModel"
import { collection, addDoc, Firestore, getFirestore } from "firebase/firestore"

class TodoController {
    private firestore: Firestore
    constructor() {
        this.firestore = getFirestore()
    }
    public addItem = async (item: TodoModel) => {
        const itemRef = await addDoc(collection(this.firestore, TodoModelName), item)
        return itemRef
    }
}

const todoController = new TodoController()
export default todoController