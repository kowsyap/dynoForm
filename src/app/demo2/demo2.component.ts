import { Component, ViewChild } from '@angular/core';
import { DynoFormConfig } from 'dist/ng-dyno-form/lib/ng-dyno-form-config.model';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.css']
})
export class Demo2Component {
  @ViewChild('f1') dynoform1:any;
  config1:DynoFormConfig[]=[
    {name:'heading1',label:`Log in`,type:'heading',class:'login',parentClass:''},
    {name:'email',label:'Email A',type:'text',required:true,section:'',pattern:/^[\w-]+(\.[\w-]+)*@([a-z\d-]+(\.[a-z\d-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/i,class:'',parentClass:'inputBox',labelClass:'user',floatLabel:true,extra:{}},
    {name:'password',label:'Password A',type:'password',required:true,section:'',pattern:'',class:'',parentClass:'inputBox',labelClass:'',floatLabel:true,extra:{}},
    {name:'signin',label:'Sign in',type:'button',section:'',class:'enter',parentClass:'',extra:{submit:true}},
  ];
  @ViewChild('f2') dynoform2:any;
  config2:DynoFormConfig[]=[
    {name:'name',placeholder:'Name',type:'text',required:true,section:'',pattern:'',class:'input',parentClass:'',labelClass:'',extra:{}},
    {name:'email',placeholder:'Email',type:'email',required:true,section:'',pattern:'',class:'input',parentClass:'',labelClass:'',extra:{}},
    {name:'phone',placeholder:'Phone',type:'text',required:true,section:'',pattern:'',class:'input',parentClass:'',labelClass:'',extra:{}},
    {name:'dob',placeholder:'DOB',type:'date',required:true,section:'',pattern:'',class:'input',parentClass:'',labelClass:'',extra:{}},
    {name:'submit',label:'Submit',type:'button',section:'',class:'c2button',parentClass:'',extra:{submit:true}},
  ];
  @ViewChild('f3') dynoform3:any;
  config3:DynoFormConfig[]=[
    {name:'fname',label:'First Name',type:'text',required:true,section:'',pattern:'',class:'',parentClass:'input-data col-6',labelClass:'',floatLabel:true,extra:{}},
    {name:'lname',label:'Last Name',type:'text',required:true,section:'',pattern:'',class:'',parentClass:'input-data col-6',labelClass:'',floatLabel:true,extra:{}},
    {name:'website',label:'Website Name',type:'text',required:true,section:'',pattern:'',class:'',parentClass:'input-data col-6',labelClass:'',floatLabel:true,extra:{}},
    {name:'email',label:'Email',type:'email',required:true,section:'',pattern:'',class:'',parentClass:'input-data col-6',labelClass:'',floatLabel:true,extra:{}},
    {name:'msg',label:'Write your message',type:'textarea',required:true,section:'',pattern:'',class:'',parentClass:'input-data textarea col-12',labelClass:'',floatLabel:true,extra:{rows:3}},
    {name:'submit',label:'Submit',type:'button',section:'',class:'submit',parentClass:'text-center submit-btn',extra:{submit:true}},
  ];



  callBackActions(e:any){
    console.log(e)
  }

}
