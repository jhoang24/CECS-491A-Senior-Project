import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';

// Routes for child Module (publicModule). Since public module is lazy loaded in in the 
// app-routing.module the full path is `/public/login` or `/public/regiser`
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path:'email-verification',
    component: EmailVerificationComponent
  },
  {
    path: 'confirm-password',
    component: ConfirmPasswordComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
