import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordMatchValidator} from "../../shared/validators/password_match_validator";
import {UserRegisterInterface} from "../../shared/types/interfaces/user/user-register.interface";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{
    registerForm!:FormGroup
    isSubmited = false

    returnUrl = ""

    constructor(private fb:FormBuilder,private userService:UserService,private activatedRoute:ActivatedRoute,private router:Router) {
    }

    ngOnInit(): void {
        this.initializeForm()
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl']
    }

    initializeForm(){
        this.registerForm = this.fb.group({
            name:['',[Validators.required,Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required,Validators.minLength(6)]],
            confirmPassword:['',Validators.required],
            address:['',Validators.required]
        },{
            validators:PasswordMatchValidator('password','confirmPassword')
        })
    }

    get fc() {
        return this.registerForm.controls
    }

    submit() {
        this.isSubmited = true
        if (this.registerForm.invalid) return;
        this.userService.register({
            email: this.fc['email'].value,
            password: this.fc['password'].value,
            address:this.fc['address'].value,
            name:this.fc['name'].value,
            confirmPassword:this.fc['confirmPassword'].value
        } as UserRegisterInterface ).subscribe(() => {
            this.router.navigateByUrl(this.returnUrl)
        })
    }

}
