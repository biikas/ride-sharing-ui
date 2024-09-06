import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { HttpClient } from '@angular/common/http';
import { MapService, RideRequestDTO } from './map.service';
declare const H: any; // Declare HERE Maps API globally

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class HereMapComponent implements OnInit {
  private platform: any;
  private map: any;
  private behavior: any;
  private ui: any;
  private startMarker: any;
  private endMarker: any;
  private userLocation: { lat: number; lng: number } | null = null;
  private endLocation: { lat: number; lng: number } | null = null;
  ridername!: string;
  riderId!: any;


  @ViewChild('startAddress') startAddressInput!: ElementRef<HTMLInputElement>;
  @ViewChild('endAddress') endAddressInput!: ElementRef<HTMLInputElement>;

  requestForm!: FormGroup;

  constructor(
    private readonly geolocation$: GeolocationService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private mapService:MapService
  ) {
    this.requestForm = this.formBuilder.group({
      startAddress: [null, Validators.required],
      endAddress: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMap();
    this.getCurrentPosition();
    this.loadUserData();
  }

  loadMap(): void {
    this.platform = new H.service.Platform({
      apikey: 'HZkPx3GYmJhzX80dRW-mjRJB_VzfyZhSJmXyjseBXiA', // Replace with your API key
    });

    const defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      document.getElementById('mapContainer') as HTMLElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 14,
        center: { lat: 27.7172, lng: 85.324 },
      }
    );

    this.behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(this.map)
    );
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);

    this.map.addEventListener('tap', (event: any) => {
      const coord = this.map.screenToGeo(
        event.currentPointer.viewportX,
        event.currentPointer.viewportY
      );
      this.placeMarker(coord, 'temporary'); // Add a temporary marker
    });
  }

  loadUserData() {
    const riderUsername = sessionStorage.getItem('username');
    const riderId = sessionStorage.getItem('userId');
    if (riderUsername) {
      this.ridername = riderUsername;

    }
    if (this.ridername) {

      this.riderId = riderId

    }

  }

  placeMarker(location: any, type: 'start' | 'end' | 'temporary'): void {
    if (type === 'start') {
      if (this.startMarker) {
        this.map.removeObject(this.startMarker);
      }
      this.startMarker = new H.map.Marker(location, {
        icon: new H.map.Icon(
          'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        ),
      });
      this.map.addObject(this.startMarker);
    } else if (type === 'end') {
      if (this.endMarker) {
        this.map.removeObject(this.endMarker);
      }
      this.endMarker = new H.map.Marker(location, {
        icon: new H.map.Icon(
          'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        ),
      });
      this.map.addObject(this.endMarker);
    }
  }

  getCurrentPosition(): void {
    this.geolocation$.subscribe((position) => {
      const coords = position.coords;
      this.userLocation = { lat: coords.latitude, lng: coords.longitude };
      this.map.setCenter(this.userLocation);
      this.map.setZoom(14);

      const userMarker = new H.map.Marker(this.userLocation, {
        icon: new H.map.Icon(
          'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        ),
      });
      this.map.addObject(userMarker);
      console.log("usermarker", this.userLocation)

      this.reverseGeocode(this.userLocation).then((address) => {
        if (address) {
          // this.startAddressInput.nativeElement.value = address;
          this.requestForm.patchValue({ startAddress: address });
        } else {
          console.error('Start address input not found');
        }
      });
    });
  }

  reverseGeocode(coords: { lat: number; lng: number }): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = `https://geocode.search.hereapi.com/v1/revgeocode?at=${coords.lat},${coords.lng}&lang=en-US&apikey=HZkPx3GYmJhzX80dRW-mjRJB_VzfyZhSJmXyjseBXiA`;

      this.http.get(url).subscribe(
        (result: any) => {
          console.log("result", result)
          if (result.items) {
            const address = result.items[0].title;
            resolve(address);
          } else {
            reject('No address found');
          }
        },
        (error) => {
          reject(`Error with reverse geocoding: ${error.message}`);
        }
      );
    });
  }

  async findPath(): Promise<void> {
    const startAddress = this.requestForm.get('startAddress')?.value;
    const endAddress = this.requestForm.get('endAddress')?.value;
    const geocode = (address: string) =>
      new Promise<any>((resolve, reject) => {
        const url = `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apikey=HZkPx3GYmJhzX80dRW-mjRJB_VzfyZhSJmXyjseBXiA`;

        this.http.get(url).subscribe(
          (result: any) => {
            if (result.items && result.items.length > 0) {
              resolve(result.items[0].position);
            } else {
              reject('No results found for address: ' + address);
            }
          },
          (error) => {
            reject('Geocoding service error: ' + error.message);
          }
        );
      });

    try {
      // Determine the start location
      let startLocation;
      if (startAddress) {
        startLocation = await geocode(startAddress);
        this.placeMarker(startLocation, 'start');
      } else if (this.userLocation) {
        startLocation = this.userLocation;
        this.placeMarker(this.userLocation, 'start');
      } else {
        alert('No start location provided and current location not available.');
        return;
      }

      // Determine the end location
      let endLocation;
      if (endAddress) {
        endLocation = await geocode(endAddress);
        this.placeMarker(endLocation, 'end');
        this.map.setCenter(endLocation);  // Center the map at the end location
        this.map.setZoom(14);
        this.endLocation = endLocation;             // Adjust zoom level if needed
      } else {
        alert('No end address provided.');
        return;
      }

      // Get route from startLocation to endLocation
      this.calculateRoute(startLocation, endLocation);

    } catch (error) {
      console.error(error); // Log the exact error
      alert('Failed to find the locations. Please try again later. Error: ' + error);
    }
  }

  async calculateRoute(startLocation: any, endLocation: any) {
    const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${startLocation.lat},${startLocation.lng}&destination=${endLocation.lat},${endLocation.lng}&return=polyline,summary&apiKey=HZkPx3GYmJhzX80dRW-mjRJB_VzfyZhSJmXyjseBXiA`;

    this.http.get(url).subscribe(
      (result: any) => {
        if (result.routes && result.routes.length > 0) {
          const route = result.routes[0];
          this.addRouteToMap(route);
          this.printDistance(route);
        }
      },
      (error) => {
        console.error('Routing service error:', error);
      }
    );
  }


  printDistance(route: any) {
    //debugger;
    const distance = route.sections[0].summary.length;
    if (distance) {
      this.totalDistance = distance / 1000;
      this.showAmount = true;
    }
    this.calculateAmount();
    console.log(`The distance between the start and end points is ${distance} meters.`);
  }

  addRouteToMap(route: any) {
    const routeShape = route.sections[0].polyline;
    const linestring = H.geo.LineString.fromFlexiblePolyline(routeShape);

    const routeLine = new H.map.Polyline(linestring, {
      style: { strokeColor: 'blue', lineWidth: 5 }
    });

    this.map.addObject(routeLine);
    this.map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
  }

  amount!: number;
  totalDistance!: number;
  showAmount: boolean = false;
  amountInRupee!: string;

  calculateAmount() {
    this.amount = this.totalDistance * 15
    console.log("this.amount", this.amount)
    this.amountInRupee = "Rs." + Math.floor(this.amount);
  }


  rideRequestDTO!:RideRequestDTO;
  bookRide() {

    const rideRequest: RideRequestDTO = {
      riderName: this.ridername,
      amount: Math.floor(this.amount),
      startLocationName: this.requestForm.controls['startAddress'].value,
      endLocationName: this.requestForm.controls['endAddress'].value,
      startLocationLatitude: this.userLocation?.lat.toString() ? this.userLocation?.lat.toString() : '',
      startLocationLongitude: this.userLocation?.lng.toString() ? this.userLocation?.lng.toString() : '',
      endLocationLatitude: this.endLocation?.lat.toString() ? this.endLocation?.lng.toString() : '',
      endLocationLongitude: this.endLocation?.lng.toString() ? this.endLocation?.lng.toString() : '',
      riderId: this.riderId,
      distance:this.totalDistance.toString()
    }
    console.log("ride request", rideRequest);

    this.mapService.createRide(rideRequest)
            .subscribe({
                next: response => {
                    this.rideRequestDTO = response.data
                    console.log("Ride Request success with id",this.rideRequestDTO.id)
                },
                error: errorResponse => {
                  console.error("some error occured")
                }
            })
  }
}
