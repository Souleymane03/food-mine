import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from 'src/app/shared/types/models/cart/cart.model';
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../shared/types/models/user/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cartQuantity!:number
    user!:UserModel

  constructor(cartService:CartService,private userService:UserService){
    cartService.getCartObservable().subscribe((cart) => this.cartQuantity = cart.totalCount)
      this.userService.userObservable.subscribe((user) => {
          this.user = user
      })
  }

  logout(){
      this.userService.logout()
  }

    get isAuth(){
        return this.user.token
    }

}
