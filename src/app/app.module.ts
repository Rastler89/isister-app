import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrivateMenuComponent } from './pages/private-menu/private-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environment/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PrivateMenuComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
