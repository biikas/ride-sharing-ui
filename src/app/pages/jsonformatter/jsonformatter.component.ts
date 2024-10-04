import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NbCardModule, NbLayoutModule } from "@nebular/theme";

@Component({
    selector:'tool-json-formatter',
    templateUrl:'./jsonformatter.component.html',
    styleUrls: ['./jsonformatter.component.scss'],
    standalone:true,
    imports:[CommonModule,NbCardModule,FormsModule,NbLayoutModule]
})
export class JsonFormatterComponent {

    jsonInput: string = '';
    formattedJson: string ='';
    errorMessage: string | null = null;
  
    formatJson() {
      try {
        const parsedJson = JSON.parse(this.jsonInput);
        this.formattedJson = JSON.stringify(parsedJson, null, 2); // Pretty print JSON
        this.errorMessage = null;
      } catch (error) {
        this.formattedJson = '';
        this.errorMessage = 'Invalid JSON: ' + (error as Error).message;
      }
    }

}