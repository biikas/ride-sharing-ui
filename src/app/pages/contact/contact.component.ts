import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector:'contact',
    styleUrls:['./contact.component.scss'],
    templateUrl:'./contact.component.html',
    standalone:true,
    imports:[CommonModule]
})
export class ContactComponent {

    teamMembers = [
        {
          name: 'Anusha Shrestha',
          description: 'Member 1 description goes here.',
          photo: 'assets/anusha.jpg'
        },
        {
          name: 'Member 2',
          description: 'Member 2 description goes here.',
          photo: 'assets/member2.jpg'
        },
        {
          name: 'Member 3',
          description: 'Member 3 description goes here.',
          photo: 'assets/member3.jpg'
        }
      ];
    
}