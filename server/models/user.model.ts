import { Timestamp } from "firebase/firestore";
import { UserRolesEnum } from "../types/enums/UserRolesEnum";

export const UserModelName = "user";
export type UserModelSchema = {
  uid: string;
  email: string;
  roles: UserRolesEnum[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
