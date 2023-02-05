import {Injectable} from '@angular/core';
import {OrderModel} from "../shared/types/models/order/order.model";
import {HttpClient} from "@angular/common/http";
import {ORDER_CREATE_URL} from "../shared/constants/urls";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http:HttpClient) {
    }

    createOrder(order:OrderModel){
        return this.http.post<OrderModel>(ORDER_CREATE_URL,order)
    }

}
