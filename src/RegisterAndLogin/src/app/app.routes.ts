import { Routes } from '@angular/router';
import { LoginPageComponent } from 'projects/ral-ui/src/lib/auth/login-page/login-page.component';
import { RegisterPageComponent } from 'projects/ral-ui/src/lib/auth/register-page/register-page.component';
import { StartRalPageComponent } from 'projects/ral-ui/src/lib/auth/start-ral-page/start-ral-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'start' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'start', component: StartRalPageComponent },
];
