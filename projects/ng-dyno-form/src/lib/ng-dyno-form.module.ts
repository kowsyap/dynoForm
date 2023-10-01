import { NgModule } from '@angular/core';
import { NgDynoFormComponent } from './ng-dyno-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    NgDynoFormComponent
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,BrowserModule,BrowserAnimationsModule, BsDatepickerModule, NgSelectModule
  ],
  exports: [
    NgDynoFormComponent
  ]
})
export class NgDynoFormModule { }
