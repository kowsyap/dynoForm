import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgDynoFormComponent } from './ng-dyno-form.component';
import { NgDynoFormModule } from './ng-dyno-form.module';
import { DynoFormConfig } from './ng-dyno-form-config.model';

@Component({
  template: `<dyno-form [config]="config" (callBack)="events.push($event)" #f></dyno-form>`
})
class HostComponent {
  @ViewChild('f') form!: NgDynoFormComponent;
  config: DynoFormConfig[] = [];
  events: any[] = [];
}

describe('NgDynoFormComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function render(config: DynoFormConfig[]) {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    host.config = config;
    fixture.detectChanges();
    return host.form;
  }

  const query = (selector: string) => fixture.nativeElement.querySelector(selector);
  const queryAll = (selector: string): HTMLElement[] => Array.from(fixture.nativeElement.querySelectorAll(selector));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgDynoFormModule, NoopAnimationsModule],
      declarations: [HostComponent]
    });
  });

  it('builds a control for each form field but not for buttons or headings', () => {
    const form = render([
      { name: 'title', type: 'heading', label: 'Title' },
      { name: 'email', type: 'email' },
      { name: 'save', type: 'button', label: 'Save' }
    ]);
    expect(Object.keys(form.controls)).toEqual(['email']);
  });

  it('keeps falsy initial values such as 0 and false', () => {
    const form = render([
      { name: 'count', type: 'number', value: 0 },
      { name: 'agree', type: 'checkbox', value: false }
    ]);
    expect(form.rawValues).toEqual({ count: 0, agree: false });
  });

  it('does not make optional text fields required', () => {
    const form = render([
      { name: 'nickname', type: 'text' },
      { name: 'bio', type: 'textarea' },
      { name: 'dob', type: 'date' }
    ]);
    expect(form.dynamicForm.valid).toBeTrue();
    expect(query('input[required], textarea[required]')).toBeNull();
  });

  it('treats a section with a button as valid once its fields are filled', () => {
    const form = render([
      { name: 'email', type: 'text', required: true, section: 'a' },
      { name: 'go', type: 'button', label: 'Go', section: 'a', extra: { submit: true } }
    ]);
    form.setValue('email', 'a@b.c');
    expect(form.sectionSubmit('a')).toEqual({ valid: true, values: { email: 'a@b.c' } });
  });

  it('does not let a disabled field make its section invalid', () => {
    const form = render([
      { name: 'email', type: 'text', required: true, section: 'a', disable: true }
    ]);
    expect(form.sectionSubmit('a').valid).toBeTrue();
  });

  it('ignores required fields hidden by their condition when validating', () => {
    const form = render([
      { name: 'hasCar', type: 'checkbox', section: 'a' },
      { name: 'plate', type: 'text', required: true, section: 'a', condition: (v: any) => !!v.hasCar }
    ]);
    expect(form.sectionSubmit('a').valid).toBeTrue();
    expect(form.sectionSubmit(undefined as any).valid).toBeTrue();

    form.setValue('hasCar', true);
    expect(form.sectionSubmit('a').valid).toBeFalse();
    expect(form.sectionSubmit(undefined as any).valid).toBeFalse();
  });

  it('emits blur events with type "blur"', () => {
    render([{ name: 'email', type: 'text' }]);
    query('input').dispatchEvent(new Event('blur'));
    expect(host.events.map(e => e.type)).toContain('blur');
    expect(host.events.map(e => e.type)).not.toContain('input');
  });

  it('gives every radio option its own id and label', () => {
    render([
      { name: 'gender', type: 'radio', extra: { options: ['male', 'female'] } },
      { name: 'size', type: 'radio', extra: { options: ['s', 'm'] } }
    ]);
    const ids = queryAll('input[type=radio]').map(el => el.id);
    expect(new Set(ids).size).toBe(4);
    const labels = queryAll('label[for]').map(el => el.getAttribute('for'));
    expect(labels).toEqual(ids);
  });

  it('gives file inputs ids that are unique across form instances', () => {
    const config: DynoFormConfig[] = [{ name: 'doc', type: 'file', extra: { customClass: 'x' } }];
    render(config);
    const firstId = query('input[type=file]').id;
    render(config);
    expect(query('input[type=file]').id).not.toBe(firstId);
  });

  it('disables and enables file inputs through the form methods', () => {
    const form = render([{ name: 'doc', type: 'file' }]);
    const input = () => query('input[type=file]') as HTMLInputElement;
    form.disableField('all');
    fixture.detectChanges();
    expect(input().disabled).toBeTrue();
    form.enableField('doc');
    fixture.detectChanges();
    expect(input().disabled).toBeFalse();
  });

  it('renders buttons with type="button" so they do not submit the form', () => {
    render([{ name: 'go', type: 'button', label: 'Go' }]);
    expect(query('button').getAttribute('type')).toBe('button');
  });

  it('patches the known keys even if the object has unknown ones', () => {
    const form = render([{ name: 'email', type: 'text' }]);
    form.patchValue({ email: 'a@b.c', other: 1 });
    expect(form.rawValues.email).toBe('a@b.c');
  });

  it('only shows the asterisk for validators that include required', () => {
    const form = render([{ name: 'zip', type: 'text', label: 'Zip' }]);
    form.addValidation([Validators.pattern(/\d+/)], 'zip');
    expect(form.requiredFields['zip']).toBeFalse();
    form.addValidation([Validators.required], 'zip');
    expect(form.requiredFields['zip']).toBeTrue();
  });

  describe('file format matching', () => {
    const file = (name: string, type: string) => new File(['x'], name, { type });
    let form: NgDynoFormComponent;
    beforeEach(() => (form = render([{ name: 'doc', type: 'file' }])));

    it('accepts any file when no format is set', () => {
      expect(form.isAcceptedFile(file('a.txt', 'text/plain'), undefined)).toBeTrue();
    });

    it('matches wildcard mime types', () => {
      expect(form.isAcceptedFile(file('a.png', 'image/png'), 'image/*')).toBeTrue();
      expect(form.isAcceptedFile(file('a.pdf', 'application/pdf'), 'image/*')).toBeFalse();
    });

    it('matches exact mime types and extensions in a list', () => {
      expect(form.isAcceptedFile(file('a.pdf', 'application/pdf'), 'image/png, application/pdf')).toBeTrue();
      expect(form.isAcceptedFile(file('A.DOCX', ''), '.docx,.doc')).toBeTrue();
      expect(form.isAcceptedFile(file('a.txt', 'text/plain'), '.docx,.doc')).toBeFalse();
    });

    it('does not treat "image/png" as matching "image/p"', () => {
      expect(form.isAcceptedFile(file('a.p', 'image/p'), 'image/png')).toBeFalse();
    });
  });
});
