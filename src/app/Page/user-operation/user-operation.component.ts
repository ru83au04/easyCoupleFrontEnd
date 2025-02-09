import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { UserService } from '../../Service/user.service';
import { AuthService } from '../../Service/auth.service';
import { AlertService } from '../../Service/alert.service';

@Component({
  selector: 'app-user-operation',
  providers: [provideNativeDateAdapter()],
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, RouterModule, RouterOutlet],
  template: `
    <main>
      <mat-toolbar>
        <div class="user">
          <div class="user-info">
            <div class="icon-and-name">
              <mat-icon>person</mat-icon>
              <p>{{ userName }}</p>
            </div>
            <div class="logout">
              <span>自動登出倒數</span>
              <button mat-stroked-button (click)="logout()">登出</button>
            </div>
          </div>
        </div>
        <div class="button-container">
          <button mat-stroked-button [routerLink]="['/user-operation/attendance']">出勤</button>
          <button mat-flat-button [routerLink]="['/user-operation/user-calendar']">行事曆</button>
          <button mat-fab-extended [routerLink]="['/user-operation/user-info']">個人資料</button>
        </div>
      </mat-toolbar>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .container {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      mat-toolbar {
        height: fit-content;
        display: flex;
      }

      .user {
        width: fit-content;
        background: green;
      }

      .user-info {
        display: flex;
        flex-direction: column;
      }

      .icon-and-name {
        width: 100%;
        margin: 5px;
        display: flex;
        align-items: center;
        // justify-content: space-around;
      }

      mat-icon {
        width: fit-content;
        margin: 10px;
      }

      .user-info p {
        width: 100%;
        text-align: center;
        margin: 10px;
      }

      .logout {
        margin: 5px;
      }

      .button-container {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      .calendar-container {
        display: flex;
        flex-wrap: wrap;
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
export class UserOperationComponent {
  userName!: string;
  constructor(private userSrv: UserService, private authSrv: AuthService, private alert: AlertService, private router: Router) {}

  ngOnInit() {
    this.initAuth();
  }

  initAuth() {
    let token = sessionStorage.getItem('easy_couple_token');
    if (token) {
      try {
        this.userSrv.getUserInfo(token).subscribe({
          next: data => {
            if (data.status === 200) {
              this.authSrv.loginUser(data.data[0]);
              this.authSrv.currentUser?.subscribe({
                next: data => {
                  this.userName = data.real_name;
                },
                error: err => {
                  console.log(err);
                },
              });
            }
          },
          error: err => {
            console.log(err);
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  logout() {
    this.authSrv.logoutUser();
    this.userSrv.logoutUser();
    setTimeout(() => {
      if (!sessionStorage.getItem('easy_couple_token')) {
        this.alert.showAlert('登出成功', () => {
          this.router.navigate(['/project']);
        });
      }
    }, 100);
  }
}
