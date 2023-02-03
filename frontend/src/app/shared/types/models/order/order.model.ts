import {CartItemModel} from "../cart/cart-item.model";
import {LatLng} from "leaflet";

export class OrderModel{
    id!:number
    items!:CartItemModel[]
    totalPrice!:number
    name!:string
    address!:string
    addessLatLng?:LatLng
    paymentId!:string
    createdAt!:string
    status!:string
}
