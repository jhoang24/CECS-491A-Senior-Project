import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../protected/home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { ListingComponent } from './listing/listing.component';
import { SellingComponent } from './selling/selling.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReportUserComponent } from '../report-user/report-user.component';




// Routes for child Module (protectedModule). Since protected module is lazy loaded in in the 
// app-routing.module the full path is `/protected/dashboard`
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile/:username',
    component: ProfileComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
  },
  {
    path: 'create-listing',
    component: CreateListingComponent

  },
  {
    path: 'selling',
    component: SellingComponent

  },
  {
    path: 'setting',
    component: ProfileSettingComponent

  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'public/login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'listing',
    component: ListingComponent
  },
  {
    path: 'report-user',
    component: ReportUserComponent
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
