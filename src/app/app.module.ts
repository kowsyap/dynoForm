import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgDynoFormModule } from 'ng-dyno-form';
import { Demo1Component } from './demo1/demo1.component';
import { Demo2Component } from './demo2/demo2.component';

@NgModule({
  declarations: [
    AppComponent,
    Demo1Component,
    Demo2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    NgDynoFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
