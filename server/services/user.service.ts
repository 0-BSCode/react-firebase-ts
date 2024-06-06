import { UserModelName, UserModelSchema } from "@server/models/user.model";
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc
} from "firebase/firestore";

class UserService {
  private firestore: Firestore;

  constructor() {
    this.firestore = getFirestore();
  }

  public getItems = async () => {
    const items = await getDocs(collection(this.firestore, UserModelName));
    return items;
  };

  public getItem = async (id: string) => {
    const itemRef = doc(this.firestore, UserModelName, id);
    const item = await getDoc(itemRef);
    return item;
  };

  public addItem = async (item: UserModelSchema) => {
    const itemRef = await addDoc(collection(this.firestore, UserModelName), item);
    return itemRef;
  };

  public updateItem = async (itemId: string, item: UserModelSchema) => {
    const itemRef = doc(this.firestore, UserModelName, itemId);
    const updatedItem = await updateDoc(itemRef, item);
    return updatedItem;
  };

  public deleteItem = async (itemId: string) => {
    const deletedItem = await deleteDoc(doc(this.firestore, UserModelName, itemId));
    return deletedItem;
  };
}

const userService = new UserService();
export default userService;
