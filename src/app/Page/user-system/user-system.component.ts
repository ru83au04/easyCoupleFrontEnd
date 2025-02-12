import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { AlertService } from '../../Service/alert.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../../Service/auth.service';
import { RegistComponent } from './regist/regist.component';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-system',
  imports: [FormsModule, NgIf, RegistComponent, LoginComponent],
  templateUrl: './user-system.component.html',
  styleUrls: ['./user-system.component.css'],
})
export class UserSystemComponent {
  alertMessage: string = '';
  showAlert: boolean = false;
  showRegistPage: boolean = false;
  showLoginPage: boolean = false;

  constructor(private userSrv: UserService, private alertSrv: AlertService, private router: Router) {}

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
  
  // NOTE: 取消註冊或登入
  onCancel(event: boolean){
    this.showRegistPage = event;
    this.showLoginPage = event;
  }
  // NOTE: 登入或註冊關閉 Alert視窗
  onClosedAlert(event: boolean) {
    this.showAlert = event;
    if (sessionStorage.getItem('easy_couple_token')) {
      // TODO: 後面要改成，登入成功只出現 toast淡出並自動轉跳至操作頁面
      this.router.navigate(['/user-operation']);
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
}

interface registResult {
  result: boolean;
  message: string;
}
