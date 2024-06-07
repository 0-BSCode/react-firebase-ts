import { Timestamp } from "firebase/firestore";

export const OrderModelName = "order";
export type OrderModelSchema = {
  ownerId: string;
  orderItemIds: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
