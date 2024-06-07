export type SchemaInferred<T> = T & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EventSchemaInferred = SchemaInferred<EventModelSchema> & {
  occuringDate: Date;
};
