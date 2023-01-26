import { CartItemModel } from "./cart-item.model";

export class CartModel {
  items:CartItemModel[] = []
  totalPrice:number = 0
  totalCount:number = 0
}
