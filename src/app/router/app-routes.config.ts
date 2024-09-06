import { Routes } from '@angular/router';
import { AboutComponent } from '../pages/about/about.component';
import { HomeCompnent } from '../pages/home/home.component';
import { LayoutComponent } from '../pages/layout/layout.component';
import { LoginComponent } from '../pages/login/login.component';
import { RiderRegisterComponent } from '../pages/rider-register/rider-register.component';
import { DriverRegisterComponent } from '../pages/driver-register/driver-register.component';
import { HereMapComponent } from '../pages/map/map.component';
import { ContactComponent } from '../pages/contact/contact.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeCompnent },
      { path: 'about', component: AboutComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'contact', component: ContactComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'rider-register', component: RiderRegisterComponent },
  { path: 'driver-register', component: DriverRegisterComponent },
  { path: 'map', component: HereMapComponent },
];
