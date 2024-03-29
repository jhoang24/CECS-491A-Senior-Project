import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { MessagesComponent } from './messages/messages.component';
import { FileDragNDropDirective } from './create-listing/file-drag-n-drop.directive';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { HomeComponent } from './home/home.component';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatMenuModule} from '@angular/material/menu';
import { HeaderComponent } from './header/header.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component'; 
import { ListingComponent } from './listing/listing.component';
import { SellingComponent } from './selling/selling.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SearchComponent } from './search/search.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';
import { CategoryComponent } from './category/category.component'; 
import { ReportUserComponent } from '../report-user/report-user.component';
import { ReportListingComponent } from '../report-listing/report-listing.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    FavoritesComponent,
    MessagesComponent,
    CreateListingComponent,
    FileDragNDropDirective,
    HomeComponent,
    HeaderComponent,
    ProfileSettingComponent,
    ListingComponent,
    SellingComponent,     
    ChangePasswordComponent, 
    DeleteConfirmationDialogComponent,
    SearchComponent, 
    DeleteAccountComponent, 
    DeleteAccountDialogComponent,
    CategoryComponent, 
    DeleteAccountDialogComponent, 
    ReportUserComponent,
    ReportListingComponent
  ],
  imports: [
    CommonModule,
    // Import our Routes for this module
    ProtectedRoutingModule,
    // Angular Material Imports
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    // Angular Material Imports
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatDividerModule,
    MatMenuModule,
    MatGridListModule,
    MatSidenavModule,
    MatDialogModule
  ]
})
export class ProtectedModule { }
