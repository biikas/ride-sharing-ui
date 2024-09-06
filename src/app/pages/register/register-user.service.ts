import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Response } from "src/app/core/response";
import { environment } from "src/app/environment/environment";

export interface RegisterUserRequest {
    username:string;
    password:string;
    emailAddress:string;
    firstName:string;
    lastName:string;
    mobileNumber:string;
    userType:string;
}
export interface RegistrationUserResponse {
    username:string;
    emailAddress:string;
}



@Injectable({
    providedIn: 'root',
})
export class RegisterUserService {

    WEB_PATH = environment.WEB_ENDPOINT;

    readonly REGISTER_USER = 'register/user';

    constructor(
        private http:HttpClient,
    ){}



    registerUser(request:  RegisterUserRequest) {
        return this.http.post<Response<RegistrationUserResponse>>(this.WEB_PATH + '/' + this.REGISTER_USER, request);
    }

    
}