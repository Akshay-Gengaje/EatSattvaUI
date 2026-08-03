import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SelectGoalComponent } from './pages/select-goal/select-goal';
import { BoxPreviewComponent } from './pages/box-preview/box-preview';
import { CheckoutComponent } from './pages/checkout/checkout';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'select-goal', component: SelectGoalComponent },
  { path: 'box-preview', component: BoxPreviewComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' },
];
