import { ResponseStatusEnum } from "./enums/ResponseStatusEnum";

export interface ResponseI<T> {
  status: ResponseStatusEnum;
  body: T;
}
