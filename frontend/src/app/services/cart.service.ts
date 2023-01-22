import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItemInterface } from '../shared/types/cart-item.interface';
import { CartInterface } from '../shared/types/cart.interface';
import { FoodInterface } from '../shared/types/food.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:CartInterface = this.getCartFromlocalStorage()
  private cartSubject: BehaviorSubject<CartInterface> = new BehaviorSubject(this.cart)

  constructor() { }

  addToCart(food:FoodInterface):void{
    let cartItem = this.cart.items.find(item => item.food.id === food.id)
    if(cartItem)
      return;
    this.cart.items.push(new CartItemInterface(food))
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
    this.cart = new CartInterface()
    this.setCartToLocalStarage()
  }

  getCartObservable():Observable<CartInterface>{
    return this.cartSubject.asObservable()
  }

  private setCartToLocalStarage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum,currentItem) => prevSum + currentItem.price,0)
    this.cart.totalCount = this.cart.items.reduce((prevSum,currentItem) => prevSum + currentItem.quantity,0)
    let cartJson = JSON.stringify(this.cart)

    localStorage.setItem("Cart",cartJson)
    this.cartSubject.next(this.cart)
  }

  private getCartFromlocalStorage():CartInterface{
    const cartJson = localStorage.getItem("Cart")
    return cartJson? JSON.parse(cartJson):new CartInterface()
  }
}
