import { Component, HostListener, } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MapService } from './Service/map.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_capacitor_2';
  headVisible: boolean = true;

  constructor(private mapSrv: MapService){ }

  ngOnInit() { }
  
  @HostListener('window:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    const head = document.getElementById('head');
    const title = document.getElementById('head-title');
    const buttons = document.getElementById('button-container');
    if (head) {
      const rect = head.getBoundingClientRect();
      const distance = 50;
      if (
        event.clientX >= rect.left - distance &&
        event.clientX <= rect.right + distance &&
        event.clientY >= rect.top - distance &&
        event.clientY <= rect.bottom + distance
      ) {
        head.classList.add('show');
        title!.style.visibility = 'visible';
        buttons!.style.visibility = 'visible';
      } else {
        head.classList.remove('show');
        title!.style.visibility = 'hidden';
        buttons!.style.visibility = 'hidden';
      }
    }
  }
}
