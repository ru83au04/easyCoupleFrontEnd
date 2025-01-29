import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'app-user-system',
  imports: [FormsModule],
  templateUrl: './user-system.component.html',
  styleUrls: ['./user-system.component.css'],
})
export class UserSystemComponent {
  name?: string;
  password?: string;
  loginName: string = '';
  loginPassword: string = '';
  usinName?: string;

  constructor(private userSrv: UserService) { }

  ngOnInit() {}
  // NOTE: 註冊使用者
  registUser() {
    if (this.name && this.password) {
      try {
        this.userSrv.registUser(this.name, this.password).subscribe({
          next: (data) => {
            console.log(data.status);
            console.log(data.data);
            if (data.status === 200) {
              // TEST: 測試用
              console.log('註冊成功');
              this.name = '';
              this.password = '';
              return;
            } else {
              // TEST: 測試用
              console.log('不明錯誤');
              return;
            }
          },
          error: (error) => {
            // TEST: 測試用，要在設計處理或通知邏輯
            console.log(`註冊失敗：${error.status}`, error.message);
          },
        });
      } catch (err) {
        // TEST: 測試用，要在設計處理或通知邏輯
        console.error('註冊失敗', err);
      }
    } else {
      // TEST: 測試用，要在設計處理或通知邏輯
      console.log('請輸入帳號or密碼');
    }
  }
  // NOTE: 登入使用者
  async loginUser() {
    if (this.loginName === '' || this.loginPassword === '') {
      // TEST: 測試用，要在設計處理或通知邏輯
      console.log('請輸入帳號or密碼');
      return;
    }
    try {
        this.userSrv.loginUser(this.loginName, this.loginPassword).subscribe({
          next: (data) => {
            if (data.status === 200) {
              // TEST: 測試用
              console.log('登入成功');
              localStorage.setItem('token', data.data[0]);
              this.loginName = '';
              this.loginPassword = '';
              return;
            } else {
              // TEST: 測試用
              console.log('不明錯誤');
              return;
            }
          },
          error: (error) => {
            // TEST: 測試用，要在設計處理或通知邏輯
            console.log(`登入失敗：${error.status}`, error.message);
          },
        });
    } catch (err) {
      // TEST: 測試用，要在設計處理或通知邏輯
        console.error('登入失敗', err);
      }
  }
  // NOTE: 已登入的使用者查看資料
  async getUserInfo() {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        // TEST: 測試用，要在設計處理或通知邏輯
        console.log('請先登入');
        return;
      }
      this.userSrv.getUserInfo(token!).subscribe({
        next: (data) => {
          if (data.status === 200) {
            // TEST: 測試用
            console.log('查詢成功');
            console.log("查詢結果", data.data);
            return;
          } else {
            // TEST: 測試用
            console.log('查詢失敗');
            return;
          }
        },
        error: (error) => {
          // TEST: 測試用，要在設計處理或通知邏輯
          console.log(`查詢失敗：${error.status}`, error.message);
        },
      });
    } catch (err) {
      // TEST: 測試用，要在設計處理或通知邏輯
      console.error('查詢失敗', err);
    }
  }
}
