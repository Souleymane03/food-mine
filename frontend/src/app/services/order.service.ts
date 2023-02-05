import {Injectable} from '@angular/core';
import {OrderModel} from "../shared/types/models/order/order.model";
import {HttpClient} from "@angular/common/http";
import {ORDER_CREATE_URL, ORDER_GET_URL, ORDER_PAY_URL, ORDER_TRACK_URL} from "../shared/constants/urls";
import {UserModel} from "../shared/types/models/user/user.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http:HttpClient) {
    }

    createOrder(order:OrderModel){
        return this.http.post<OrderModel>(ORDER_CREATE_URL,order)
    }

    getNewOrderForCurrentUser():Observable<OrderModel>{
        return this.http.get<OrderModel>(ORDER_GET_URL);
    }

    pay(order:OrderModel):Observable<OrderModel>{
        return this.http.post<OrderModel>(ORDER_PAY_URL,order);
    }

    trackOderById(id:string):Observable<OrderModel>{
        return this.http.get<OrderModel>(ORDER_TRACK_URL+ id);
    }

}
