import {Component} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {OrderModel} from "../../../shared/types/models/order/order.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-payment-page',
    templateUrl: './payment-page.component.html',
    styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {
    order:OrderModel = new OrderModel()
    constructor(oderService:OrderService,router:Router) {
        oderService.getNewOrderForCurrentUser().subscribe({
            next: (order) => {
                this.order = order
            },
            error: () => {
                router.navigateByUrl('/checkout')
            }
        })
    }

}
