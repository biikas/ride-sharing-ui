import { Routes } from '@angular/router';
import { LayoutComponent } from '../pages/layout/layout.component';
import { PasswordGeneratorComponent } from '../pages/password-generator/password-generator.component';
import { JsonFormatterComponent } from '../pages/jsonformatter/jsonformatter.component';
import { StopWatchComponent } from '../pages/stop-watch/stop-watch.component';


export const AppRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // { path: 'programmers-tools', component: ProgrammersToolsComponent },
      // { path: 'students-tools', component: StudentsToolsComponent },
      // { path: 'writers-tools', component: WritersToolsComponent },
      // { path: 'business-tools', component: BusinessToolsComponent },
      // { path: 'general-tools', component: GeneralToolsComponent },
    ],

  },
  {
    path: 'password-generator',
    component: PasswordGeneratorComponent
  },
  {
    path:'json-formatter',
    component:JsonFormatterComponent
  },
  {
    path:'stop-watch',
    component:StopWatchComponent
  },
  { path: '**', redirectTo: '' },
];
