import { Component } from '@angular/core';
import {OrderModel} from "../../../shared/types/models/order/order.model";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css']
})
export class OrderTrackPageComponent {

    order!:OrderModel
    constructor(activatedRoute:ActivatedRoute,router:Router,orderService:OrderService ) {

        const params = activatedRoute.snapshot.params;
        if(!params['orderId']) return;

        orderService.trackOderById(params['orderId']).subscribe( order => {
            this.order = order;
        })
    }

}
