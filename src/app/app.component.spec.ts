import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading and demo buttons', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Dynamic Forms');
    expect(Array.from(compiled.querySelectorAll('button')).map(b => b.textContent?.trim())).toEqual(['Demo 1', 'Demo 2']);
  });

  it('should navigate when a demo button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
    fixture.componentInstance.redirect('/demo2');
    expect(navigate).toHaveBeenCalledWith(['/demo2']);
  });
});
