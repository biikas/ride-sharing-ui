import { Component } from "@angular/core";
import { NbActionsModule, NbIconModule } from "@nebular/theme";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [NbActionsModule]
})
export class HeaderComponent{

    toggleSidebar(){}

}