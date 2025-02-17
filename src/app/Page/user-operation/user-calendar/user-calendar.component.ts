import { Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-user-calendar',
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule],
  template: `
    <div class="calendar-container">
      <mat-card class="calendar-card">
        <mat-calendar [(selected)]="selected"></mat-calendar>
      </mat-card>
      <div class="calender-schedule">
        <p>Selected date: {{ selected() }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .calendar-container {
        display: flex;
        flex-wrap: wrap;
        padding: 30px 100px 80px 100px;
      }

      .calendar-card {
        width: 33%;
        margin: 50px;
      }

      .calender-schedule {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class UserCalendarComponent {
  selected = model<Date | null>(null);
}
