import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DynoFormConfig } from './ng-dyno-form-config.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'dyno-form',
  templateUrl: './ng-dyno-form.component.html',
  styleUrls: ['./ng-dyno-form.component.scss']
})
export class NgDynoFormComponent {

  @Input() config!:DynoFormConfig[]|any;
  @Input() mainClass:any;
  @Input() mode:'light'|'dark'='light';
  @Output('callBack') callBack: EventEmitter<any> = new EventEmitter();

  dynamicForm:FormGroup;
  passwordVisibility:{ [fieldName: string]: boolean } = {};
  selectList:{ [fieldName: string]: any[] } = {};
  nonFormTypes:string[] = ['button','heading'];

  constructor(private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['config']){
      this.buildForm();
    }
  }

  buildForm(){
    this.dynamicForm = this.fb.group({});
    if(this.config && this.config?.length){
      this.config.forEach((field:any) => {
        if(field.name && !this.nonFormTypes.includes(field.type)){
          let validators = [];
          field.required? validators.push(Validators.required): null;
          field.pattern? validators.push(Validators.pattern(field.pattern)): null;
          this.dynamicForm.addControl(field.name, new FormControl({value:field.value||null,disabled:field.disable||false}, validators));
          if(field.type==='file') this.dynamicForm.addControl(field.name+'_name', new FormControl(field?.extra?.fileName||null));
          if (field.type === 'password') this.passwordVisibility[field.name] = false;
          if (field.type === 'select') this.selectList[field.name] = field?.extra?.options||[];
        }
      });
    }
  }

  get controls() { return this.dynamicForm.controls}

  get allKeys() { return Object.keys(this.dynamicForm.getRawValue())}

  get rawValues() { return this.dynamicForm.getRawValue()}

  get formValues() { return this.dynamicForm.value}

  hasCtrl = (ctrl:any) => this.allKeys.includes(ctrl);

  hasAllKeys = (arr:any[]) => arr.every(elem => this.allKeys.includes(elem));

  filterConfig = (key:any,val?:any,bool?:boolean) => this.config.filter((ele:any) => val ? ele[key]===val : (bool?ele[key]:!ele[key]));
  
  getTypeKeys = (type:any,value?:any,bool?:boolean) => (this.filterConfig(type,value,bool)).map((ele:any)=>ele['name']);

  getTypeValues = (type:any,value?:any,bool?:boolean) => this.getTypeKeys(type,value,bool).reduce((acc:any, key:any) => (this.rawValues.hasOwnProperty(key)? { ...acc, [key]: this.rawValues[key] } : acc), {});


  addValidation(validation:any[],...ctrls:string[]){
    ctrls.forEach((ctrl:any)=>{
      if(this.hasCtrl(ctrl)){
        this.dynamicForm.get(ctrl)?.addValidators(validation);
        this.dynamicForm.get(ctrl)?.updateValueAndValidity();
      }
    });
  }

  clearValidation(...ctrls:string[]){
    ctrls.forEach((ctrl:any)=>{
      if(this.hasCtrl(ctrl)){
        this.dynamicForm.get(ctrl)?.clearValidators();
        this.dynamicForm.get(ctrl)?.updateValueAndValidity();
      }
    });
  }

  setValue(ctrl:string,value:any){
    if(this.hasCtrl(ctrl)){
      this.dynamicForm.get(ctrl)?.setValue(value);
      this.dynamicForm.get(ctrl)?.updateValueAndValidity();
    }
  }

  patchValue(obj:any){
    if(obj && this.hasAllKeys(Object.keys(obj))){
      this.dynamicForm.patchValue(obj);
    }
  }

  resetValue(...ctrls:any){
    if(ctrls==='all') this.dynamicForm.reset();
    else{
      ctrls.forEach((ctrl:any)=>{
        if(this.hasCtrl(ctrl)) this.setValue(ctrl,null);
      })
    }
  }

  disableField(...ctrls:any){
    if(ctrls==='all') ctrls = Object.keys(this.dynamicForm.getRawValue());
    ctrls.forEach((ctrl:any)=>{
      if(this.hasCtrl(ctrl)){
        this.dynamicForm.get(ctrl)?.disable();
      }
    })
  }

  enableField(...ctrls:any){
    if(ctrls==='all') ctrls = Object.keys(this.dynamicForm.getRawValue());
    ctrls.forEach((ctrl:any)=>{
      if(this.hasCtrl(ctrl)){
        this.dynamicForm.get(ctrl)?.enable();
      }
    })
  }

  sectionValidator(section:string){
    if(section||section===''){
      let ctrls = this.filterConfig('section',section?section:undefined,false).map((e:any)=>e.name);
      ctrls?.forEach((ctrl:any)=>{
        this.dynamicForm.get(ctrl)?.markAsTouched();
      })
      return ctrls?.every((ctrl:any)=>this.dynamicForm?.get(ctrl)?.valid);
    } else{
      this.dynamicForm.markAllAsTouched();
      return this.dynamicForm.valid;
    }
  }

  sectionSubmit(section:string){
    let valid = this.sectionValidator(section);
    return {
      valid : valid,
      values : (section||section==='') ? this.getTypeValues('section',section?section:undefined,false) : this.rawValues
    }
  }

  formsubmit(){
    this.dynamicForm.markAllAsTouched();
    return {
      valid : this.dynamicForm.valid,
      values : this.rawValues
    }
  }

  eventCall(e:any,type:string,section:any,name:string,submit?:any){
    let values = null;
    if(submit){
      values = this.sectionSubmit(section);
    }
    this.callBack.emit({
      event : submit?values:e,
      type: type,
      section: section,
      name : name
    });
  }

  onFileSelected(event:any,section:any,name:string){
    let config = this.config.find((e:any)=>e.name===name);
    const file = event.target.files[0];
    if (file && config && (config?.extra?.format?.includes(file.type)||!config?.extra?.format)) {
      const reader = new FileReader();
        reader.onload = (e: any) => {
          this.setValue(name,e.target.result);
          this.setValue(name+'_name',file.name);
        };
        reader.readAsDataURL(file);
    } else{
      this.setValue(name,'');
      this.setValue(name+'_name','');
      event.target.value=null;
    }
    this.eventCall(event,'file',section,name);
  }
  
}