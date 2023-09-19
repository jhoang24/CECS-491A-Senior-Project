import { PublicRoutingModule } from './public-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateListingComponent } from './components/create-listing/create-listing.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { FileDragNDropDirective } from './components/create-listing/file-drag-n-drop.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';





@NgModule({
  declarations: [
    // Own Components
    LoginComponent,
    RegisterComponent,
    CreateListingComponent,
    FileDragNDropDirective,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    // Import our Routes for this module
    PublicRoutingModule,
    // Angular Forms Imports
    ReactiveFormsModule,
    FormsModule,
    // Angular Material Imports
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule
  ]
})
export class PublicModule { }
