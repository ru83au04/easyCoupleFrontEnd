import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() finishRegist = new EventEmitter<Object>();

  loginName: string = '';
  loginPassword: string = '';

  constructor(private userSrv: UserService) {}

  // NOTE: 登入使用者
  async loginUser() {
    if (this.loginName === '' || this.loginPassword === '') {
      // TODO: 跳出提醒視窗
      console.log('請輸入帳號or密碼');
      return;
    }
    try {
      this.userSrv.loginUser(this.loginName, this.loginPassword).subscribe({
        next: (data) => {
          if (data.status === 200) {
            // TODO: 彈出通知視窗
            console.log('登入成功');
            localStorage.setItem('token', data.data[0]);
            this.loginName = '';
            this.loginPassword = '';
          } else {
            // TODO: 彈出通知視窗
            console.log('不明錯誤');
          }
        },
        error: (error) => {
          // TODO: 彈出通知視窗
          console.log(`登入失敗：${error.status}`, error.message);
          throw error;
        },
      });
    } catch (err) {
      // TODO: 彈出通知視窗
      console.error('登入失敗', err);
    }
  }

  finish(result: boolean, message: string) {
    this.finishRegist.emit({ result, message });
  }
}
