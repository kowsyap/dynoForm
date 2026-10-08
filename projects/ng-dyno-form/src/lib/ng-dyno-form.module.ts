import { NgModule } from '@angular/core';
import { NgDynoFormComponent } from './ng-dyno-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    NgDynoFormComponent
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule, BsDatepickerModule, NgSelectModule
  ],
  exports: [
    NgDynoFormComponent
  ]
})
export class NgDynoFormModule { }
