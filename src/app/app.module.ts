import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Project1SService } from './project1-s.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ng-modal-lib';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule,
    MatSelectModule

    ],
  providers: [Project1SService], /*la list des services a instancier dans le module courant qui est app*/
  bootstrap: [AppComponent]
})
export class AppModule { }
