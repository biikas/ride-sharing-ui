import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports:[CommonModule]
})
export class HeaderComponent {
  constructor(private router: Router) {}
  isLoggedIn: boolean = true; // Replace with actual auth logic
  username!: string;
  userType!:string;

  // Logic to determine if user is logged in
  checkAuth() {
    debugger;
    // Example logic; replace with actual implementation
    const token = sessionStorage.getItem('AccessToken');
    if (token) {
      this.isLoggedIn = true;
      const username = sessionStorage.getItem('username');
      if (username) {
        this.username = username;
      }
      const userType = sessionStorage.getItem('userType')
      if(userType){
        this.userType = userType;
      }
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit() {
    this.checkAuth();
  }

  gotoLogin() {
    console.log('button is clicked');
    this.router.navigate(['/login']); // Absolute path
  }

  logout(){
    sessionStorage.clear();
    window.location.reload()
  }
  /*
  this 
  */
}