import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { NbLayoutModule, NbSidebarModule, NbMenuModule, NbActionsModule, NbSidebarService, NbInputModule, NbCheckboxModule, NbCheckboxComponent, NbCardModule, NbIconModule, NbIconLibraries } from "@nebular/theme";
import { HeaderComponent } from "../header/header.component";
import { NbEvaIconsModule } from "@nebular/eva-icons";

@Component({
    selector: 'tool-password-generator',
    templateUrl: './password-generator.component.html',
    styleUrls: ['./password-generator.component.scss'],
    standalone: true,
    imports: [NbLayoutModule,NbEvaIconsModule,NbCardModule,NbIconModule,NbCheckboxModule,FormsModule,ReactiveFormsModule, NbSidebarModule, NbMenuModule, HeaderComponent, RouterOutlet, NbActionsModule, CommonModule, FormsModule, NbInputModule,],
    providers: [NbSidebarService]
})
export class PasswordGeneratorComponent {


    passwordLength: number = 12;
    includeUppercase: boolean = true;
    includeLowercase: boolean = true;
    includeNumbers: boolean = true;
    includeSymbols: boolean = true;
    generatedPassword: string = '';

    // Character sets for password generation
    uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    numberChars = '0123456789';
    symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    ngOnInit() {
        this.generatePassword(); // Generate initial password
    }
    constructor(private iconLibraries: NbIconLibraries) {
        //this.iconLibraries.registerSvgPack('nebular', 'assets/icons/nebular-icons.svg');
        // Register other icon packs if needed
      }

    generatePassword() {
        let charSet = '';

        // Append character sets based on checkbox selections
        if (this.includeUppercase) {
            charSet += this.uppercaseChars;
        }
        if (this.includeLowercase) {
            charSet += this.lowercaseChars;
        }
        if (this.includeNumbers) {
            charSet += this.numberChars;
        }
        if (this.includeSymbols) {
            charSet += this.symbolChars;
        }

        // If no character set is selected, set an empty password
        if (charSet === '') {
            this.generatedPassword = '';
            return;
        }

        // Generate password based on the selected length and character set
        this.generatedPassword = Array.from({ length: this.passwordLength }, () =>
            charSet[Math.floor(Math.random() * charSet.length)]
        ).join('');
    }

    copyPassword() {
        navigator.clipboard.writeText(this.generatedPassword);
        alert('Password copied to clipboard!');
    }

}