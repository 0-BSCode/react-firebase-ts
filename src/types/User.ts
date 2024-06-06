import { UserModelSchema } from "@server/models/user.model";

export type User = UserModelSchema & {
  createdAt: Date;
  updatedAt: Date;
};
