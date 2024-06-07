export type SchemaInferred<T> = T & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
