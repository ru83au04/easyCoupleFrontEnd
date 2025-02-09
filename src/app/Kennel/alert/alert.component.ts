import { Component, Output, Input, EventEmitter } from '@angular/core';
import { AlertService } from '../../Service/alert.service';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Output() closeAlert = new EventEmitter<boolean>();
  @Input() alertMessage: string = '';

  constructor() { }

  // NOTE: 關閉 Alert圖層
  alertAct(show: boolean = false) {
    this.closeAlert.emit(show);
  }
}
