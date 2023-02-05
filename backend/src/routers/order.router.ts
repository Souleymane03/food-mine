import {Router} from "express";
import asyncHandler from "express-async-handler";
import {HTTP_BAD_REQUEST} from "../constants/httpStatus";
import {OrderModel} from "../models/order.model";
import {OrderStatusEnum} from "../constants/order.status";
import authMid from "../middlewares/auth.mid";

const router = Router();

router.use(authMid)

router.post('/create',asyncHandler(async (req,res) => {

    const requestOrder = req.body;

    if(requestOrder.items.length <= 0){
        res.status(HTTP_BAD_REQUEST).send("Cart is empty!");
        return;
    }

    // @ts-ignore
    await OrderModel.deleteOne({
        user: (req as any).user.id,
        status:OrderStatusEnum.NEW
    });

    // @ts-ignore
    const newOrder = new OrderModel({...requestOrder,user:(req as any).user.id});

    await newOrder.save();
    res.send(newOrder)
}));


export default router;