import { Component } from '@angular/core';
import { AuthService, User } from '../../../Service/auth.service';

@Component({
  selector: 'app-user-info',
  imports: [],
  template: `
    <main class="container">
      <p>{{ currentUser.real_name }}</p>
    </main>
  `,
  styles: [
    `
      .container {
        display: flex;
        height: 100%;
      }
    `,
  ],
})
export class UserInfoComponent {
  currentUser!: User;

  constructor(private auth: AuthService) {
    
  }

  ngOnInit() {
    this.auth.currentUser!.subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  
}
