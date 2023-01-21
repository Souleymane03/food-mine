import { FoodInterface } from "./food.interface";

export class CartItemInterface{
  constructor(public food:FoodInterface){
  }
  quantity:number = 1
  price:number = this.food.price
}
