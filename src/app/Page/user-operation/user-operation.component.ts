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
          <!-- <button class="toolBarBtn" mat-button [routerLink]="['/user-operation/attendance']">出勤</button> -->
          <!-- <button class="toolBarBtn" mat-button [routerLink]="['/user-operation/user-calendar']">行事曆</button> -->
          <button class="toolBarBtn" (click)="working()">出勤</button>
          <button class="toolBarBtn" (click)="working()">行事曆</button>
          <button class="toolBarBtn" mat-button [routerLink]="['/user-operation/user-info']">個人資料</button>
        </div>
      </mat-toolbar>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
      }

      mat-toolbar {
        height: fit-content;
        width: auto;
        display: flex;
        background-color: transparent;
        margin: 10px 20px 10px 20px;
      }

      mat-icon {
        color: var(--block-color);
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
        height: fit-content;
        padding: 3px;
        background-color: var(--block-color);
      }

      .button-container {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
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

      @media (max-width: 786px) {
        .user-info p {
          text-align: center;
          color: var(--text-color);
          margin: 3px;
          font-size: 1.2rem;
        }

        #logoutBtn {
          padding: 0px;
          margin: 0px;
          font-size: 0.8rem;
        }

        .button-container {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
        .button-container .toolBarBtn {
          color: var(--text-color);
          font-size: 1.2rem;
        }
      }

      @media (max-width: 576px) {
        .user {
          display: flex;
          flex-direction: column;
          width: fit-content;
        }
        .user-info p {
          text-align: center;
          color: var(--text-color);
          margin: 3px;
          font-size: 1rem;
        }

        #logoutBtn {
          padding: 0px;
          margin: 0px;
          font-size: 0.6rem;
          height: 0.6rem;
        }

        .button-container {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
        .button-container .toolBarBtn {
          color: var(--text-color);
          font-size: 1rem;
        }
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
  /**
   * @description 取得登入者資訊並初始化
   */
  initAuth() {
    try {
      this.userSrv.getUserInfo().subscribe({
        next: data => {
          if (data.status === 200) {
            let loginUser = data.data[0];
            loginUser.role = this.authSrv.getRole(loginUser.role_id);
            loginUser.department = this.authSrv.getDepartment(loginUser.department_id);
            this.authSrv.loginUser(loginUser);
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
  /**
   * @description 登出使用者並取消所有訂閱
   */
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

  working() {
    this.alert.showAlert('努力建置中');
  }
}
