import {model, Schema, Types} from "mongoose";
import {FoodInterface, FoodSchema} from "./food.model";
import {OrderStatusEnum} from "../constants/order.status";

export interface LatLngInterface {
    lat: string
    lng: string
}

export const LatLngSchema = new Schema<LatLngInterface>({
    lat: {type: String, required: true},
    lng: {type: String, required: true},
});


export interface OrderItemInterface {
    food: FoodInterface
    quantity: number
    price: number
}

export const OrderItemSchema = new Schema<OrderItemInterface>({
    food: {type: FoodSchema, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true}
});

export interface OrderInterface {
    id: number
    items: OrderItemInterface[]
    totalPrice: number
    name: string
    address: string
    addessLatLng: LatLngInterface
    paymentId: string
    status: OrderStatusEnum
    user: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

export const OrderSchema = new Schema<OrderInterface>({
    name: {type: String, required: true},
    address: {type: String, required: true},
    paymentId: {type: String, default:""},
    totalPrice: {type: Number, required: true},
    status: {type: String, default: OrderStatusEnum.NEW},
    addessLatLng: {type: LatLngSchema, required: true},
    items: {type: [OrderItemSchema], required: true},
    user:{type:Schema.Types.ObjectId,required:true}
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
});

export const OrderModel = model('Order',OrderSchema);