import { CartItemInterface } from "./cart-item.interface";

export class CartInterface{
  items:CartItemInterface[] = []
  totalPrice:number = 0
  totalCount:number = 0
}
