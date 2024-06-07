import { Timestamp } from "firebase/firestore";

export const OrganizationModelName = "organization";
export type OrganizationModelSchema = {
  name: string;
  description: string;
  email: string;
  tokens: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
