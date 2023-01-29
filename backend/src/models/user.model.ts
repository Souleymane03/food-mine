import {model, Schema} from "mongoose";

export interface UserInterface {
    id:string
    name: string
    email: string
    password: string
    address: string
    isAdmin:boolean;
    token:string
}

export const UserSchema = new Schema<UserInterface>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    address:{type:String,default:''},
    isAdmin:{type:Boolean,default:false},
    token:{type:String},
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
});

export const UserModel = model<UserInterface>('user',UserSchema)