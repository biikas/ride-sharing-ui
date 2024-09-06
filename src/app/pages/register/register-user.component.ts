import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { RegisterUserRequest, RegisterUserService, RegistrationUserResponse } from "./register-user.service";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NbFormFieldModule, NbButtonModule, NbInputModule } from "@nebular/theme";

@Component({
    selector: 'register-user',
    templateUrl: './register-user.component.html',
    standalone: true,
    styleUrls:['./register-user.component.scss'],
    imports: [FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule, NbFormFieldModule, RouterModule,
        NbButtonModule,
        NbInputModule,]
})
export class RegisterUserComponent {

    registrationForm!: FormGroup;
    registerUserResponse!: RegistrationUserResponse

    constructor(
        private formBuilder: FormBuilder,
        private registerUserService: RegisterUserService,
        private router:Router
    ) {
        this.registrationForm = this.formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
            emailAddress: [null, [Validators.required]],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]]
        })
    }

    registerUser() {
        const registerUserRequest: RegisterUserRequest = { ...this.registrationForm.value }
        this.registerUserService.registerUser(registerUserRequest)
            .subscribe({
                next: response => {
                    this.registerUserResponse = response.data
                    console.log("Registration success",this.registerUser)
                },
                error: errorResponse => {
                }
            })
    }

    login(){
        this.router.navigate(['login'])
    }


}