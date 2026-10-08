import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgDynoFormModule } from 'ng-dyno-form';

import { Demo1Component } from './demo1.component';

describe('Demo1Component', () => {
  let component: Demo1Component;
  let fixture: ComponentFixture<Demo1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgDynoFormModule, FormsModule, NoopAnimationsModule, BsDatepickerModule.forRoot()],
      declarations: [Demo1Component]
    });
    fixture = TestBed.createComponent(Demo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the demo form', () => {
    expect(fixture.nativeElement.querySelectorAll('dyno-form').length).toBe(2);
    expect(component.dynoform.hasCtrl('email')).toBeTrue();
  });
});
