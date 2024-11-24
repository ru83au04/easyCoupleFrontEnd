import { Component } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timecounter',
  standalone: true,
  imports: [],
  templateUrl: './timecounter.component.html',
  styleUrl: './timecounter.component.css'
})
export class TimecounterComponent {
  releaseDate = new Date('2025-02-28');
  days: number = 0;
  hours: number = 0;
  min: number = 0;
  sec: number = 0;

  private destroy$ = new Subject<void>();

  ngOnInit(){
    this.startCountdown();
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  startCountdown() {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const currentTime = new Date().getTime();
        const distance = this.releaseDate.getTime() - currentTime;

        if (distance > 0) {
          this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
          this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          this.sec = Math.floor((distance % (1000 * 60)) / 1000);
        } else {
          // 當倒數結束時，清除剩餘時間並完成訂閱
          this.days = this.hours = this.min = this.sec = 0;
          this.destroy$.next(); // 結束訂閱
        }
      });
  }
}
