import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NbFormFieldModule, NbButtonModule, NbInputModule, NbToastrService, NbToastrModule } from '@nebular/theme';
import { RegisterUserRequest, RegisterUserService, RegistrationUserResponse } from '../register/register-user.service';

@Component({
  selector: 'rider-register',
  styleUrls: ['./rider-register.component.scss'],
  templateUrl: './rider-register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    RouterModule,
    NbButtonModule,
    NbInputModule,
    NbToastrModule
  ],
  // providers:[NbToastrService]
})
export class RiderRegisterComponent {
  info: string = 'This is a sample about us page';

  riderRegisterForm!: FormGroup;
  registerUserResponse!: RegistrationUserResponse;

  constructor(
    private formBuilder: FormBuilder,
    private registerUserService: RegisterUserService,
    private router: Router,
    // private toastrService: NbToastrService
  ) {
    this.riderRegisterForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      emailAddress: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      mobileNumber: [null, [Validators.required]],
    });
  }

  register() {
    const registerUserRequest: RegisterUserRequest = {
      ...this.riderRegisterForm.value,
      userType: 'RIDER',
    };
    this.registerUserService.registerUser(registerUserRequest).subscribe({
      next: (response) => {
        this.registerUserResponse = response.data;
        console.log('Registration success', this.registerUserResponse);
        this.router.navigate(['home']);
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  }

  login() {}

  // showToast() {
  //   this.toastrService.show( 'Success', {
      
  //   });
  // }
}
