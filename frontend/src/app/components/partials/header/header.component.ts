import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartInterface } from 'src/app/shared/types/cart.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cartQuantity!:number

  constructor(cartService:CartService){
    cartService.getCartObservable().subscribe((cart) => this.cartQuantity = cart.totalCount)
  }

}
