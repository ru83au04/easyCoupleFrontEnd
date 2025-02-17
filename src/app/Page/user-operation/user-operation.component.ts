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
          </div>
          <div class="logout">
            <button id="logoutBtn" mat-flat-button (click)="logout()">登出</button>
          </div>
        </div>
        <div class="button-container">
          <button class="toolBarBtn" mat-button [routerLink]="['/user-operation/attendance']">出勤</button>
          <button class="toolBarBtn" mat-button [routerLink]="['/user-operation/user-calendar']">行事曆</button>
          <button class="toolBarBtn" mat-button [routerLink]="['/user-operation/user-info']">個人資料</button>
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
        background-color: transparent;
        margin: 10px 50px 10px 50px;
      }

      mat-icon {
        margin: 0px;
        padding: 0px;
      }

      .user {
        display: flex;
        width: fit-content;
      }

      .user-info {
        display: flex;
        flex-direction: column;
      }

      .icon-and-name {
        margin: 5px;
        display: flex;
        align-items: center;
      }

      mat-icon {
        padding: 10px;
        color: var(--block-color);
      }

      .user-info p {
        text-align: center;
        color: var(--text-color);
        margin: 10px;
      }

      .logout {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #logoutBtn {
        height: auto;
        background-color: var(--block-color);
      }

      .button-container {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-right: 10px;
        margin-left: 10px;
        padding-right: 10px;
        padding-left: 10px;
      }

      .button-container .toolBarBtn {
        color: var(--text-color);
        font-size: 1.3rem;
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
  userName: string = '';
  inputTime!: { title: string; targetDate: Date; plus: boolean; callback?: () => void };
  counter = false;
  constructor(private userSrv: UserService, private authSrv: AuthService, private alert: AlertService, private router: Router) {}

  ngOnInit() {
    this.initAuth();
  }
  
  initAuth() {
    try {
      this.userSrv.getUserInfo().subscribe({
        next: data => {
          if (data.status === 200) {
            this.authSrv.loginUser(data.data[0]);
            this.authSrv.currentUser$?.subscribe({
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
