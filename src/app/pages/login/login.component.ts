import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginRequest, LoginService } from './login.service';
import {
  NbButtonModule,
  NbFormFieldModule,
  NbInputModule,
  NbToastComponent,
} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
  ],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const loginRequest: LoginRequest = { ...this.loginForm.value };
    this.loginService.login(loginRequest).subscribe({
      next: (response) => {
        console.log('Login success');
        sessionStorage.setItem('AccessToken', response.obj.token);
        sessionStorage.setItem('username', response.obj.username);
        sessionStorage.setItem('userType',response.obj.userType);
        sessionStorage.setItem('userId',response.obj.userId)
        this.router.navigate(['home'])
      },
      error: (errorResponse) => {},
    });
  }

  signUp() {
    this.router.navigate(['register']);
  }
}
