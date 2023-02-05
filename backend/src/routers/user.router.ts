import jwt from "jsonwebtoken";
import {Router} from "express";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs'


import {UserInterface, UserModel} from "../models/user.model";
import {HTTP_BAD_REQUEST} from "../constants/httpStatus";
import {sample_users} from "../data";


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

router.post("/register", asyncHandler(async (req, res) => {
    const {email,name,address, password} = req.body;
    const user = await UserModel.findOne({email});
    if (user){
        res.status(HTTP_BAD_REQUEST)
            .send("User is already exist, please login!")
        return;
    }
    const encryptedPassword = await bcrypt.hash(password,10);
    const newUser: UserInterface = {
        id:'',
        name,
        email:email.toLowerCase(),
        password:encryptedPassword,
        address,
        isAdmin:false,
        token:''
    }

    const dbUser = UserModel.create(newUser);

    res.send(generateTokenResponse(dbUser))

}));

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        id:user.id,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: "30d"
    })

    user.token = token
    return user
}

export default router;