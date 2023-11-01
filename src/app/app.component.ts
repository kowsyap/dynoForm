import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynoForm';
  url = '/demo1';
  constructor(private router:Router){
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.url = event.url;
    });
  }

  redirect(link:any){
    this.router.navigate([link]);
    this.url=this.router.url;
  }
}