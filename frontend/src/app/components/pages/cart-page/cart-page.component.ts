import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItemInterface } from 'src/app/shared/types/cart-item.interface';
import { CartInterface } from 'src/app/shared/types/cart.interface';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  cart!:CartInterface

  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe((cart) =>{
      this.cart = cart
    })
  }

  removeFromCart(cartItem:CartItemInterface){
    this.cartService.removeFromCart(cartItem.food.id)
  }

  changeQuantity(cartItem:CartItemInterface,quantityInString:string){
    const quantity = parseInt(quantityInString)
    this.cartService.changeQuantity(cartItem.food.id,quantity)
  }

}
