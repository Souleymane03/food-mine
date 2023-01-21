import { CartItemInterface } from "./cart-item.interface";

export class Cart{
  items:CartItemInterface[] = []
  totalPrice:number = 0
  totalCount:number = 0
}
