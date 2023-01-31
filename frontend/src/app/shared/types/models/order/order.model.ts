import {CartItemModel} from "../cart/cart-item.model";

export class OrderModel{
    id!:number
    items!:CartItemModel[]
    totalPrice!:number
    name!:string
    address!:string
    paymentId!:string
    createdAt!:string
    status!:string
}
