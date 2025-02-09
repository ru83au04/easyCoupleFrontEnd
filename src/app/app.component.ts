import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { MapService } from './Service/map.service';
import { NgClass, NgIf } from '@angular/common';
import { AlertComponent } from './Kennel/alert/alert.component';
import { AlertService } from './Service/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgClass, AlertComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'easy_couple_life';
  showAlert: boolean = false;
  alertMessage: string = '';
  headHidden: boolean = false; // head 是否隱藏

  @ViewChild('appRoot') appRoot!: ElementRef;

  constructor(private mapSrv: MapService, private router: Router, private alert: AlertService) {}

  ngOnInit() {
    this.alert.alert$.subscribe((message) => {
      if(message){
        this.onShowAlert(message);
      }
    });
  }

  ngAfterViewInit() {
    this.appRoot.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
  }

  navigateTo(route: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([route]);
    });
  }

  onScroll() {
    const scrollTop = this.appRoot.nativeElement.scrollTop;
    const threshold = 50; 
    this.headHidden = scrollTop > threshold;
  }

  onShowAlert(message: string){
    this.showAlert = true;
    this.alertMessage = message;
  }

  onAlertClose(event: boolean) {
    this.showAlert = event;
  }
}
