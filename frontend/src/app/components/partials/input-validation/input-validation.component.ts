import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl} from "@angular/forms";

const VALIDATOR_MESSAGES:any = {
    required:'Should not be empty',
    email:'Email is not valid',
    minlength:'Field is too short',
    notMatch:'Passwords do not match',
}
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges{
    ngOnInit(): void {
        this.control.statusChanges.subscribe(() => {
            this.checkValidation()
        })

        this.control.valueChanges.subscribe(() => {
            this.checkValidation()
        })
    }

    @Input()
    control!:AbstractControl

    @Input()
    showErrorsWhen:boolean =true

    errorMessages:string[] = []

    checkValidation(){
        const errors = this.control.errors
        if(!errors){
            this.errorMessages = []
            return
        }
        const errorKeys = Object.keys(errors)

        this.errorMessages = errorKeys.map( key => VALIDATOR_MESSAGES[key])
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.checkValidation()
    }

}
