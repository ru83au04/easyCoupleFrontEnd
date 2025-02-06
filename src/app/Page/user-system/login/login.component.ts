import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() finishLogin = new EventEmitter<Object>();
  @Output() cancel = new EventEmitter<boolean>();

  loginName: string = '';
  loginPassword: string = '';

  constructor(private userSrv: UserService) {}

  // NOTE: 登入使用者
  async loginUser() {
    if (this.loginName === '' || this.loginPassword === '') {
      this.finish(false, '請輸入帳號or密碼');
      return;
    }
    try {
      this.userSrv.loginUser(this.loginName, this.loginPassword).subscribe({
        next: (data) => {
          if (data.status === 200) {
            localStorage.setItem('token', data.data[0]);
            this.loginName = '';
            this.loginPassword = '';
            this.finish(true, '登入成功');
          } else {
            console.log('不明錯誤');
            this.finish(false, '不明錯誤');
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(`登入失敗：${error.status}`, error.error.message);
          this.finish(false, `登入失敗：${error.error.message}`);
        },
      });
    } catch (err) {
      this.finish(false, '登入失敗');
      console.error('登入失敗', err);
    }
  }
  cancelLogin(){
    this.cancel.emit(false);
  }

  finish(result: boolean, message: string) {
    this.finishLogin.emit({ result, message });
  }
}
