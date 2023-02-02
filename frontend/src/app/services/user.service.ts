import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {UserModel} from "../shared/types/models/user/user.model";
import {UserLoginInterface} from "../shared/types/interfaces/user/user-login.interface";
import {HttpClient} from "@angular/common/http";
import {USER_LOGIN_URL, USER_REGISTER_URL} from "../shared/constants/urls";
import {ToastrService} from "ngx-toastr";
import {UserRegisterInterface} from "../shared/types/interfaces/user/user-register.interface";

const USER_KEY = "User"
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private userSubject = new BehaviorSubject<UserModel>(new UserModel())
    public userObservable: Observable<UserModel>;
    constructor(private http:HttpClient,private toastrService:ToastrService) {
        this.userObservable = this.userSubject.asObservable()
    }

    login(user:UserLoginInterface):Observable<UserModel>{
        return this.http.post<UserModel>(USER_LOGIN_URL,user).pipe(
            tap({
                next: (user) => {
                    this.setUserToLocalStorage(user)
                    this.userSubject.next(user)
                    this.toastrService.success(`Welcome to Foodmine ${user.name}!`,'Login Successful')
                },
                error: (errorResponse) => {
                    this.toastrService.error(errorResponse.error,"Login failed")
                }
            })
        )
    }


    register(user:UserRegisterInterface):Observable<UserModel>{
        return this.http.post<UserModel>(USER_REGISTER_URL,user).pipe(
            tap({
                next: (user) => {
                    this.setUserToLocalStorage(user)
                    this.userSubject.next(user)
                    this.toastrService.success(`Welcome to Foodmine ${user.name}!`,'Register Successful')
                },
                error: (errorResponse) => {
                    this.toastrService.error(errorResponse.error,"Register failed")
                }
            })
        )
    }

    logout(){
        this.userSubject.next(new UserModel())
        localStorage.removeItem(USER_KEY)
        window.location.reload()
    }

    get currentUser(): UserModel{
        return this.userSubject.value;
    }

    private setUserToLocalStorage(user:UserModel){
        localStorage.setItem(USER_KEY,JSON.stringify(user))
    }

    private getUserFromLocalStorage():UserModel{
        const user = localStorage.getItem(USER_KEY);
        if(user) return JSON.parse(user) as UserModel
        return new UserModel()
    }

}
