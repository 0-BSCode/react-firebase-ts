import { EventModelSchema } from "@server/models/event.model";

export type SchemaInferred<T> = T & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EventSchemaInferred = SchemaInferred<EventModelSchema> & {
  occurringDate: Date;
};
