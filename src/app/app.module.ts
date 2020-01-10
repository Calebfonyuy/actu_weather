import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { WeatherComponent } from './weather/weather.component';
import { IndexedDBComponent } from './indexed-db/indexed-db.component';
import {OsmapComponent} from './osmap/osmap.component';
import { DetailedWeatherComponent } from './detailed-weather/detailed-weather.component';
import { PasswordCheckDirective } from './directives/password-check.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
	IndexedDBComponent,
    UserComponent,
    UserManagementComponent,
    WeatherComponent,
    OsmapComponent,
    DetailedWeatherComponent,
    PasswordCheckDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
	FormsModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
