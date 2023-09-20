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



@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    FavoritesComponent,
    MessagesComponent,
    CreateListingComponent,
    FileDragNDropDirective,
    HomeComponent,
     
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
    MatMenuModule
  ]
})
export class ProtectedModule { }
