import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { AlertService } from '../../../Service/alert.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() finishLogin = new EventEmitter<Object>();
  @Output() cancel = new EventEmitter<boolean>();

  loginName: string = '';
  loginPassword: string = '';

  constructor(private userSrv: UserService, private alert: AlertService, private router: Router) {}

  // NOTE: 登入使用者
  async loginUser() {
    if (this.loginName === '' || this.loginPassword === '') {
      this.alert.showAlert('請輸入帳號or密碼');
      return;
    }
    try {
      this.userSrv.loginUser(this.loginName, this.loginPassword).subscribe({
        next: (data) => {
          if (data.status === 200) {
            sessionStorage.setItem('easy_couple_token', data.data[0]);
            this.loginName = '';
            this.loginPassword = '';
            this.alert.showAlert('登入成功',() => {
              this.router.navigate(['/user-operation']);
            });            
          } else {
            console.log('不明錯誤');
            this.alert.showAlert('不明錯誤');
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(`登入失敗：${error.status}`, error.error.message);
          this.alert.showAlert(`登入失敗：${error.error.message}`);
        },
      });
    } catch (err) {
      this.alert.showAlert('登入失敗');
      console.error('登入失敗', err);
    }
  }
  cancelLogin(){
    this.cancel.emit(false);
  }
}
