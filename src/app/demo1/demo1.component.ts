import { Component, ViewChild } from '@angular/core';
import { DynoFormConfig } from 'dist/ng-dyno-form/lib/ng-dyno-form-config.model';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.css']
})
export class Demo1Component {
  @ViewChild('f1') dynoform:any;
  formConfig:DynoFormConfig[]=[
    //section a
    {name:'heading1',label:`<span class="text-light">Section A</span>`,type:'heading',class:'fs-2 text-center bg-primary',parentClass:'col-12'},
    {name:'email',label:'Email A',type:'text',required:true,section:'a',pattern:/^[\w-]+(\.[\w-]+)*@([a-z\d-]+(\.[a-z\d-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/i,class:'form-control',parentClass:'col-md-6',labelClass:'form-label',extra:{}},
    {name:'password',label:'Password A',type:'password',required:true,section:'a',pattern:'',class:'form-control',parentClass:'col-md-6',labelClass:'form-label',extra:{}},
    {name:'address',label:'Address',type:'textarea',required:true,section:'a',pattern:'',class:'form-control',parentClass:'col-12',labelClass:'form-label',extra:{rows:2}},
    {name:'address2',label:'Address 2',type:'textarea',required:true,section:'a',pattern:'',class:'form-control',parentClass:'col-12',labelClass:'form-label',extra:{rows:2}},
    {name:'city',label:'City',type:'text',required:true,section:'a',pattern:'',class:'form-control',parentClass:'col-md-6',labelClass:'form-label',extra:{}},
    {name:'state',label:'State',type:'select',required:true,section:'a',pattern:'',class:'',parentClass:'col-md-4',labelClass:'form-label',extra:{options:[],key:'id',label:'name'}},
    {name:'zip',label:'Zip',type:'text',required:true,section:'a',pattern:'',class:'form-control',parentClass:'col-md-2',labelClass:'form-label',extra:{}},
    {name:'check',label:'Check me out',type:'checkbox',required:false,section:'a',pattern:'',class:'form-check-input',parentClass:'col-12 flexgap',labelClass:'form-check-label',extra:{}},
    {name:'signin',label:'Sign in',type:'button',section:'a',class:'btn btn-primary',parentClass:'col-12',extra:{submit:true}},
    //section b
    {name:'heading2',label:`<span class="text-light">Section B</span>`,type:'heading',class:'fs-2 text-center bg-success',parentClass:'col-12'},
    {name:'email2',label:'Email B',type:'text',required:true,section:'b',pattern:'',class:'form-control',parentClass:'col-12 d-flex mb-3',labelClass:'col-sm-2 col-form-label',extra:{}},
    {name:'password2',label:'Password B',type:'password',required:true,section:'b',pattern:'',class:'form-control',parentClass:'col-12 d-flex mb-3',labelClass:'col-sm-2 col-form-label',extra:{}},
    {label:'Join Date',name:'joindate',type:'date',required:true,class:'form-control',section:'b',parentClass:'col-6 d-flex mb-3',value:'10-22-2023',labelClass:'col-sm-4 col-form-label',extra:{format:'MM-DD-YYYY',maxDate:new Date()}},
    {label:'Document',name:'doc',type:'file',required:true,class:'form-control',section:'b',parentClass:'col-6 d-flex mb-3',value:'10-22-2023',labelClass:'col-sm-4 col-form-label',extra:{customClass:'fileDecor',customText:'Empty'}},
    {name:'gender',label:'Gender',type:'radio',class:'form-check',parentClass:'col-12 d-flex mb-3',labelClass:'col-sm-2 col-form-label',extra:{options:[{name:'male',id:123},{name:'female',id:456}],key:'id',label:'name'}},
    {name:'check2',label:'Check me out',type:'checkbox',required:false,section:'b',pattern:'',class:'form-check-input',parentClass:'col-12 flexgap',labelClass:'form-check-label',value:true,extra:{}},
    {name:'signin2',label:'Sign in',type:'button',section:'b',class:'btn btn-success',parentClass:'col-12',extra:{submit:true}},
    {name:'signin3',label:'Sign in All',type:'button',class:'btn btn-warning',parentClass:'col-12 text-end',extra:{submit:true}},
  ];
  states:any=[
    { name: 'Andhra Pradesh', id: 769 },
    { name: 'Arunachal Pradesh', id: 203 },
    { name: 'Assam', id: 498 },
    { name: 'Bihar', id: 946 },
    { name: 'Chhattisgarh', id: 721 },
    { name: 'Goa', id: 182 },
    { name: 'Gujarat', id: 147 },
    { name: 'Haryana', id: 593 },
    { name: 'Himachal Pradesh', id: 472 },
    { name: 'Jharkhand', id: 615 },
    { name: 'Karnataka', id: 309 },
    { name: 'Kerala', id: 830 },
    { name: 'Madhya Pradesh', id: 588 },
    { name: 'Maharashtra', id: 914 },
    { name: 'Manipur', id: 814 },
    { name: 'Meghalaya', id: 371 },
    { name: 'Mizoram', id: 92 },
    { name: 'Nagaland', id: 963 },
    { name: 'Odisha', id: 335 },
    { name: 'Punjab', id: 899 },
    { name: 'Rajasthan', id: 405 },
    { name: 'Sikkim', id: 7 },
    { name: 'Tamil Nadu', id: 195 },
    { name: 'Telangana', id: 693 },
    { name: 'Tripura', id: 877 },
    { name: 'Uttar Pradesh', id: 246 },
    { name: 'Uttarakhand', id: 351 },
    { name: 'West Bengal', id: 181 },
    { name: 'Jammu and Kashmir', id: 651 }
  ];

  submit(temp:any){
    let val = temp.formsubmit();
    console.log(val);
  }

  callBackActions(e:any){
    if(e && e?.name==='state' && e?.type==="search"){
      if(e?.event?.term && e?.event?.term?.length>2){
        let term = e.event.term.toLowerCase();
        let statelist = this.states.filter((e:any)=>e.name?.toLowerCase().indexOf(term)>-1);
        this.dynoform.selectList['state'] = statelist;
        console.log(statelist,this.dynoform.selectList['state'])
      }
    }
  }

}
