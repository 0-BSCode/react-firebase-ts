import { OrganizationModelSchema } from "@server/models/organization.model";
export type Organization = OrganizationModelSchema & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
