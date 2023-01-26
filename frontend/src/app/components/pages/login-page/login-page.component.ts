import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../../../shared/types/models/user/user.model";


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
    loginForm!: FormGroup
    isSubmited = false
    returnUrl = ""

    constructor(private fb: FormBuilder, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
        this.initialiseForm()
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl']
    }

    private initialiseForm(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.min(8), Validators.required]]
        })
    }

    get fc() {
        return this.loginForm.controls
    }

    submit() {
        this.isSubmited = true
        if (this.loginForm.invalid) return;
        this.userService.login({email: this.fc['email'].value, password: this.fc['password'].value}).subscribe(() => {
            this.router.navigateByUrl(this.returnUrl)
        })
    }


}
