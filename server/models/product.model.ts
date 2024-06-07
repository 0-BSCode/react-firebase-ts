import { Timestamp } from "firebase/firestore";

export const ProductModelName = "product";
export type ProductModelSchema = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
