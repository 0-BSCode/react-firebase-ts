import { Timestamp } from "firebase/firestore";

export const EventModelName = "event";
export type EventModelSchema = {
  title: string;
  description: string;
  completed: boolean;
  organizationId: string;
  occurringDate: Timestamp;
  location: string;
  requireAttendance: boolean;
  attendeeIds: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
