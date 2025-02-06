import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { NgIf } from '@angular/common';
import { User } from '../../Service/auth.service';
import { AuthService } from '../../Service/auth.service';
import { RegistComponent } from './regist/regist.component';
import { LoginComponent } from './login/login.component';
import { UserAlertComponent } from './user-alert/user-alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-system',
  imports: [FormsModule, NgIf, RegistComponent, LoginComponent, UserAlertComponent],
  templateUrl: './user-system.component.html',
  styleUrls: ['./user-system.component.css'],
})
export class UserSystemComponent {
  alert = new UserAlertComponent();
  alertMessage: string = '';
  showAlert: boolean = false;
  showRegistPage: boolean = false;
  showLoginPage: boolean = false;

  constructor(private userSrv: UserService, private authSrv: AuthService, private router: Router) {}

  ngOnInit() {}

  // NOTE: 註冊使用者頁面開啟
  showPage(type: string) {
    if (type === 'login') {
      this.showLoginPage = true;
      this.showRegistPage = false;
    } else {
      this.showRegistPage = true;
      this.showLoginPage = false;
    }
  }
  // NOTE: 成功註冊或登入
  onFinish(event: Object) {
    let regist: registResult = event as registResult;
    if (regist.result) {
      this.alertMessage = regist.message;
      this.alert.Alert(() => {
        this.showRegistPage = false;
        this.showLoginPage = false;
      });
    } else {
      this.alertMessage = regist.message;
      this.alert.Alert(() => {});
    }
    this.showAlert = true;
  }
  // NOTE: 取消註冊或登入
  onCancel(event: boolean){
    this.showRegistPage = event;
    this.showLoginPage = event;
  }
  // NOTE: 登入或註冊關閉 Alert視窗
  onClosedAlert(event: boolean) {
    this.showAlert = event;
    if (localStorage.getItem('token')) {
      // HACK: 後面要改到導向登入後的操作頁面
      this.router.navigate(['/']);
    }
  }

  // NOTE: 已登入的使用者查看資料
  async getUserInfo(id: number) {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        // TODO: 跳出提醒視窗
        console.log('請先登入');
        return;
      }
      this.userSrv.getUserInfo(token, id).subscribe({
        next: data => {
          if (data.status === 200) {
            // TODO: 跳出提醒視窗
            console.log('查詢成功');
            let user: User = data.data[0];
            this.authSrv.loginUser(user);
          } else {
            // TODO: 跳出提醒視窗
            console.log('查詢失敗');
          }
        },
        error: error => {
          // TODO: 跳出提醒視窗
          console.log(`查詢失敗：${error.status}`, error.message);
          throw error;
        },
      });
    } catch (err) {
      // TODO: 跳出提醒視窗
      console.error('查詢失敗', err);
    }
  }
  async deleteUser(id: number) {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        // TODO: 跳出提醒視窗
        console.log('請先登入');
        return;
      }
      if (id && id !== 0) {
        this.userSrv.deleteUser(token, id).subscribe({
          next: data => {
            if (data.status === 200) {
              console.log('刪除成功');
            } else {
              // TODO: 跳出提醒視窗
              console.log('不明原因刪除失敗');
            }
          },
          error: error => {
            // TODO: 跳出提醒視窗
            console.log(`刪除失敗：${error.status}`, error.message);
            throw error;
          },
        });
      } else {
        // TODO: 跳出提醒視窗
        console.log('請輸入有效ID');
      }
    } catch (err) {
      // TODO: 跳出提醒視窗
      console.error('刪除失敗', err);
    }
  }
  logoutUser() {
    this.authSrv.logoutUser();
    localStorage.removeItem('token');
  }
}

interface registResult {
  result: boolean;
  message: string;
}

// // NOTE: 確認使用者
// checkUser() {
//   if (this.name && this.password && this.checkPassword === this.password) {
//     try {
//       this.userSrv.checkUser(this.name, this.password).subscribe({
//         next: (data) => {
//           if (data.status === 200) {
//             if (!data.data[0]) {
//               this.register = true;
//               this.userData['username'] = this.name;
//               this.userData['password'] = this.password;
//               this.name = '';
//               this.password = '';
//               this.checkPassword = '';
//             } else {
//               // TODO: 跳出提醒視窗
//               console.log('使用者已存在');
//             }
//           } else {
//             // TODO: 跳出提醒視窗
//             console.log('不明問題');
//           }
//         },
//         error: (error) => {
//           // TODO: 跳出提醒視窗
//           console.log(`確認失敗：${error.status}`, error.message);
//           throw error;
//         },
//       });
//     } catch (err) {
//       // TODO: 跳出提醒視窗
//       console.error('確認失敗', err);
//     }
//   } else {
//     console.log('請確認帳號、密碼或確認密碼');
//   }
// }
// // NOTE: 註冊使用者
// registUser() {
//   if (this.userData.username && this.userData.password && this.userData.real_name != '' && this.userData.emergency != '') {
//     try {
//       this.userSrv.registUser(this.userData).subscribe({
//         next: (data) => {
//           if (data.status === 200) {
//             // TODO: 跳出提醒視窗
//             console.log('註冊成功');
//             this.userData = {
//               real_name: '',
//               emergency: '',
//               address: '',
//               start_date: new Date(),
//               role_id: 0,
//               department_id: 0,
//             };
//             this.register = false;
//           } else {
//             // TODO: 跳出提醒視窗
//             console.log('不明錯誤');
//           }
//         },
//         error: (error) => {
//           // TODO: 跳出提醒視窗
//           console.log(`註冊失敗：${error.status}`, error.message);
//           throw error;
//         },
//       });
//     } catch (err) {
//       // TODO: 跳出提醒視窗
//       console.error('註冊失敗', err);
//     }
//   } else {
//     // TODO: 彈出提醒視窗
//     console.log('註冊資料不完整');
//   }
// }
