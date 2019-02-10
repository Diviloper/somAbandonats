import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SigninComponent} from './signin/signin.component';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import { MainComponent } from './main/main.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    FlexLayoutModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
