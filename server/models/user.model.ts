import { Timestamp } from "firebase/firestore";
import { UserRolesEnum } from "../types/enums/UserRolesEnum";

export const UserModelName = "user";
export type UserModelSchema = {
  uid: string;
  email: string;
  name: string;
  roles: UserRolesEnum[];
  points: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
