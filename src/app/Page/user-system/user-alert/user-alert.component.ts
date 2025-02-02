import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-alert',
  imports: [],
  templateUrl: './user-alert.component.html',
  styleUrls: ['./user-alert.component.css']
})
export class UserAlertComponent {
  @Output() closeAlert = new EventEmitter<boolean>();
  @Input() alertMessage: string = '';

  constructor() { }
  // TODO: 操作結果通知
  Alert(confirm: () => void) {
    confirm();
  }
  close() {
    this.closeAlert.emit(false);
  }
}
