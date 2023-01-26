import { FoodModel } from "../food_and_tag/food.model";

export class CartItemModel {
  constructor(public food:FoodModel){
  }
  quantity:number = 1
  price:number = this.food.price
}
