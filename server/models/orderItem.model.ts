import { Timestamp } from "firebase/firestore";

export const OrderItemModelName = "order-item";
export type OrderItemModelSchema = {
  productId: string;
  quantity: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
