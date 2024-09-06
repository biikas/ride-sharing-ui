import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { HereMapComponent } from "../map/map.component";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  standalone: true,
  imports:[CommonModule,HereMapComponent]
})
export class HomeCompnent implements OnInit {
  loggedIn: boolean = false;

  username!: string;
  userType!:string;


  checkAuth() {
    const token = sessionStorage.getItem('AccessToken');
    if (token) {
      this.loggedIn = true;
      const username = sessionStorage.getItem('username');
      if (username) {
        this.username = username;
      }
      const userType = sessionStorage.getItem('userType');
      if (userType) {
        this.userType = userType;
      }
    } else {
      this.loggedIn = false;
    }
  }

  ngOnInit(): void {
    this.checkAuth();
  }
}