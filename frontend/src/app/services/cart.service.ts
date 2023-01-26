import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItemModel } from '../shared/types/models/cart/cart-item.model';
import { CartModel } from '../shared/types/models/cart/cart.model';
import { FoodModel } from '../shared/types/models/food_and_tag/food.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:CartModel = this.getCartFromlocalStorage()
  private cartSubject: BehaviorSubject<CartModel> = new BehaviorSubject(this.cart)

  constructor() { }

  addToCart(food:FoodModel):void{
    let cartItem = this.cart.items.find(item => item.food.id === food.id)
    if(cartItem)
      return;
    this.cart.items.push(new CartItemModel(food))
    this.setCartToLocalStarage()
  }
  removeFromCart(foodId:string):void{
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId)
    this.setCartToLocalStarage()
  }
  changeQuantity(foodId:string,quantity:number){
    let cartItem = this.cart.items.find(item => item.food.id === foodId)
    if(!cartItem)
      return;
    cartItem.quantity = quantity
    cartItem.price = cartItem.food.price * cartItem.quantity
    this.setCartToLocalStarage()
  }

  clearart(){
    this.cart = new CartModel()
    this.setCartToLocalStarage()
  }

  getCartObservable():Observable<CartModel>{
    return this.cartSubject.asObservable()
  }

  private setCartToLocalStarage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum,currentItem) => prevSum + currentItem.price,0)
    this.cart.totalCount = this.cart.items.reduce((prevSum,currentItem) => prevSum + currentItem.quantity,0)
    let cartJson = JSON.stringify(this.cart)

    localStorage.setItem("Cart",cartJson)
    this.cartSubject.next(this.cart)
  }

  private getCartFromlocalStorage():CartModel{
    const cartJson = localStorage.getItem("Cart")
    return cartJson? JSON.parse(cartJson):new CartModel()
  }
}
