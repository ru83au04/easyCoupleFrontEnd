import { Component,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  // SignIn(){
  //   fetch('/api/checkin', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ userId: '{{ userId }}' }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //         alert('打卡成功！');
  //       } else {
  //         alert('打卡失敗');
  //       }
  //     })
  //     .catch((error) => console.error('Check-in error:', error));
  // }
}
