import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from "primeng/password";
import { DividerModule } from "primeng/divider";
import {DropdownModule} from 'primeng/dropdown';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import {PaginatorModule} from 'primeng/paginator';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MessageService } from 'primeng/api';

import { RecipesModule } from './components/recipes/recipes.module';

import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ChangeColorDirective } from './directives/change-color.directive';
import { EsempioComponent } from './components/esempio/esempio.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { VideoComponent } from './components/video/video.component';



@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    RecipesComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationComponent,
    ChangeColorDirective,
    EsempioComponent,
    LoginComponent,
    ProfileComponent,
    VideoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    BrowserAnimationsModule,
    DropdownModule,
    NgbCollapseModule,
    HttpClientModule,
    PaginatorModule,
    ToastModule,
    CKEditorModule,
    RecipesModule
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ], // Must add this one.
  providers: [ MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
