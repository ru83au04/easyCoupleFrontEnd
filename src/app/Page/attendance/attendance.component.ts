import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  imports: [],
  template: `
    <main>
      <div class="left-area"></div>
      <div class="right-area">
        <button>login</button>
        <button>logout</button>
      </div>
    </main>
  `,
  styles: [``],
})
export class AttendanceComponent {

  constructor(private http: HttpClient) {
  }
  clockIn() {
    this.http.post('/clockIn', {}).subscribe(
      (data: any) => {
        alert(data.message);
      },
      error => {
        console.error(error);
        alert('打卡失敗，請稍後再試。');
      }
    );
  }

  clockOut() {
    this.http.post('/clockOut', {}).subscribe(
      (data: any) => {
        alert(data.message);
      },
      error => {
        console.error(error);
        alert('打卡失敗，請稍後再試。');
      }
    );
  }
}
