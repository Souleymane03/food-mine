import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItemModel } from 'src/app/shared/types/models/cart/cart-item.model';
import { CartModel } from 'src/app/shared/types/models/cart/cart.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  cart!:CartModel

  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe((cart) =>{
      this.cart = cart
    })
  }

  removeFromCart(cartItem:CartItemModel){
    this.cartService.removeFromCart(cartItem.food.id)
  }

  changeQuantity(cartItem:CartItemModel, quantityInString:string){
    const quantity = parseInt(quantityInString)
    this.cartService.changeQuantity(cartItem.food.id,quantity)
  }

}
