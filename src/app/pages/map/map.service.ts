import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Response } from "src/app/core/response";
import { environment } from "src/app/environment/environment";

export interface RideRequestDTO {
    id?: number;
    riderId: number;
    riderName: string;
    amount: number;
    startLocationName: string;
    endLocationName: string;
    startLocationLatitude: string;
    startLocationLongitude: string;
    endLocationLatitude: string;
    endLocationLongitude: string;
    distance: string;
}

@Injectable({
    providedIn: 'root',
})
export class MapService {

    WEB_PATH = environment.WEB_ENDPOINT;

    readonly CREATE = 'ride/request/create';

    constructor(
        private http: HttpClient,
    ) { }



    createRide(request: RideRequestDTO) {
        return this.http.post<Response<RideRequestDTO>>(this.WEB_PATH + '/' + this.CREATE, request);
    }


}