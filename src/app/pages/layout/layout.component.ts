import { Component } from "@angular/core";
import { NbActionsModule, NbCheckboxModule, NbLayoutModule, NbMenuItem, NbMenuModule, NbSidebarModule, NbSidebarService } from "@nebular/theme";
import { HeaderComponent } from "../header/header.component";
import { Router, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'tool-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [NbLayoutModule,NbCheckboxModule, NbSidebarModule, NbMenuModule, HeaderComponent, RouterOutlet, NbActionsModule, CommonModule, FormsModule],
  providers: [NbSidebarService]
})
export class LayoutComponent {

  constructor(
    private router:Router
  ){}

  searchQuery: string = '';
  tools = [
    { name: 'Stop watch Checker', description: 'Tool for record time for your action', icon: 'edit-outline', link: 'stop-watch' },
    { name: 'Json Formatter', description: 'Tool for formatting code.', icon: 'code-outline', link: 'json-formatter' },
    { name: 'Plagiarism Checker', description: 'Tool for detecting plagiarism.', icon: 'alert-circle-outline', link: 'password-generator' },
    { name: 'Password Generator', description: 'Tool for generating passwords.', icon: 'lock-outline', link: 'password-generator' },
    { name: 'Markdown Editor', description: 'Editor for writing markdown.', icon: 'file-text-outline', link: 'password-generator' },
    { name: 'Markdown Editor', description: 'Editor for writing markdown.', icon: 'file-text-outline', link: 'password-generator' },
    { name: 'Markdown Editor', description: 'Editor for writing markdown.', icon: 'file-text-outline', link: 'password-generator' },
    { name: 'Markdown Editor', description: 'Editor for writing markdown.', icon: 'file-text-outline', link: 'password-generator' },
    // Add more tools as necessary
  ];

  filteredTools = [...this.tools]; // Initialize with all tools

  filterTools() {
    const query = this.searchQuery.toLowerCase().trim();
    if (query) {
      this.filteredTools = this.tools.filter(tool =>
        tool.name.toLowerCase().includes(query)
      );
    } else {
      this.filteredTools = [...this.tools]; // Reset to all tools if query is empty
    }
  }

  navigateToTool(toolLink: string) {
    this.router.navigate([`/${toolLink}`]);
  }

}
