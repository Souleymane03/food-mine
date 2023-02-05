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

router.get("/newOrderForCurrentUser",asyncHandler(async (req,res) => {
    const order = await getOrderForCurrentUser(req)

    if(order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send()
}));

router.post('/pay',asyncHandler(async (req:any,res) => {
    const { paymentId } = req.body;
    const order = await getOrderForCurrentUser(req);

    if(!order)
        res.status(HTTP_BAD_REQUEST).send();
    else {
        order.paymentId = paymentId;
        order.status = OrderStatusEnum.PAYED;
        await order.save();

        res.send(order._id)
    }

}));

router.get("/track/:id",asyncHandler(async (req:any,res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}));


async function getOrderForCurrentUser(req: any) {
    return OrderModel.findOne({user: (req as any).user.id, status: OrderStatusEnum.NEW});
}

export default router;