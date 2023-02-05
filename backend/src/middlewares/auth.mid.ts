import {HTTP_UNAUTHORIZED_REQUEST} from "../constants/httpStatus";
import {verify} from "jsonwebtoken";


export default (req:any,res:any,next:any) => {
    const token = req.headers.access_token as string;

    if(!token){
        res.status(HTTP_UNAUTHORIZED_REQUEST).send();
    }

    try {
        const decodeUser = verify(token,process.env.JWT_SECRET!);

        req.user = decodeUser;

    }catch (error){
        res.status(HTTP_UNAUTHORIZED_REQUEST).send();
    }

    return next();
}