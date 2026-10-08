import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgDynoFormModule } from 'ng-dyno-form';

import { Demo2Component } from './demo2.component';

describe('Demo2Component', () => {
  let component: Demo2Component;
  let fixture: ComponentFixture<Demo2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgDynoFormModule, FormsModule, NoopAnimationsModule, BsDatepickerModule.forRoot()],
      declarations: [Demo2Component]
    });
    fixture = TestBed.createComponent(Demo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all three forms', () => {
    expect(fixture.nativeElement.querySelectorAll('dyno-form').length).toBe(3);
  });
});
