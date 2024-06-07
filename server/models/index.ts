import * as UserModel from "./user.model";
import * as EventModel from "./event.model";
import * as OrderModel from "./order.model";
import * as OrderItemModel from "./orderItem.model";
import * as OrganizationModel from "./organization.model";
import * as ProductModel from "./product.model";
import * as TodoModel from "./todo.model";

// TODO: Revisit (no need to have unique name since import is already unique)
export type ModelSchemaType =
  | UserModel.UserModelSchema
  | EventModel.EventModelSchema
  | OrderModel.OrderModelSchema
  | OrderItemModel.OrderItemModelSchema
  | OrganizationModel.OrganizationModelSchema
  | ProductModel.ProductModelSchema
  | TodoModel.TodoModelSchema;

export enum ModelNameEnum {
  USER = UserModel.UserModelName,
  EVENT = EventModel.EventModelName,
  ORDER = OrderModel.OrderModelName,
  ORDER_ITEM = OrderItemModel.OrderItemModelName,
  ORGANIZATION = OrganizationModel.OrganizationModelName,
  PRODUCT = ProductModel.ProductModelName,
  TODO = TodoModel.TodoModelName
}
