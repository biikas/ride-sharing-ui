import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone:true,
  imports:[HeaderComponent,RouterModule]
})
export class LayoutComponent {
  isLoggedIn: boolean = false; // Replace with actual auth logic

  // Logic to determine if user is logged in
  checkAuth() {
    // Example logic; replace with actual implementation
    this.isLoggedIn = true;
  }

  ngOnInit() {
    //this.checkAuth();
  }
}
