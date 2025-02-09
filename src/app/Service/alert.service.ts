import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new BehaviorSubject<string>('');
  public alert$ = this.alertSubject.asObservable();

  showAlert(message: string, callback?: () => void) {
    this.alertSubject?.next(message);
    if (callback) {
      callback();
    }
  }
}
