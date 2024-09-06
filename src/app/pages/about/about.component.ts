import { Component } from "@angular/core";

@Component({
    selector:'home',
    styleUrls:['./about.component.scss'],
    templateUrl:'./about.component.html',
    standalone:true
})
export class AboutComponent {

  info:string ="This is a sample about us page";
    
}