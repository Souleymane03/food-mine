import {API_MAIN} from "../constants/urls";
import {sample_foods, sample_users} from "../data";
import jwt from "jsonwebtoken";
import {Router} from "express";
import asyncHandler from "express-async-handler";
import {UserModel} from "../models/user.model";


const router = Router()

router.get("/seed", asyncHandler(
    async (req, res) => {
        const userCount = await UserModel.countDocuments()
        if(userCount > 0){
            res.send("Seed is already done")
            return;
        }
        await UserModel.create(sample_users)
        res.send("Seed is done")
    }
));

router.post("/login", asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email,password});
    if (user)
        res.send(generateTokenResponse((user)))
    else
        res.status(400).send("User email or password is not correct.")
}));

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, "secretText", {
        expiresIn: "30d"
    })

    user.token = token
    return user
}

export default router;