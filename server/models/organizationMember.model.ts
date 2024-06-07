import { Timestamp } from "firebase/firestore";

export const OrganizationMemberModelName = "organization-member";
export type OrganizationMembeModelSchema = {
  organizationId: string;
  memberId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
