import { ModelNameEnum, ModelSchemaType } from "@server/models";
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

// Interacts with Firebase
class DbService<T extends ModelSchemaType> {
  private firestore: Firestore;
  private tableName: ModelNameEnum;
  constructor(tableName: ModelNameEnum) {
    this.tableName = tableName;
    this.firestore = getFirestore();
  }

  public getItems = async () => {
    const items = await getDocs(collection(this.firestore, this.tableName));
    return items;
  };

  public getItem = async (id: string) => {
    const itemRef = doc(this.firestore, this.tableName, id);
    const item = await getDoc(itemRef);
    return item;
  };

  public addItem = async (item: T) => {
    const itemRef = await addDoc(collection(this.firestore, this.tableName), item);
    return itemRef;
  };

  public updateItem = async (itemId: string, item: T) => {
    const itemRef = doc(this.firestore, this.tableName, itemId);
    const updatedItem = await updateDoc(itemRef, item);
    return updatedItem;
  };

  public deleteItem = async (itemId: string) => {
    const deletedItem = await deleteDoc(doc(this.firestore, this.tableName, itemId));
    return deletedItem;
  };
}

export default DbService;
