import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-system',
  imports: [FormsModule, NgIf],
  templateUrl: './user-system.component.html',
  styleUrls: ['./user-system.component.css'],
})
export class UserSystemComponent {
  name?: string;
  password?: string;
  checkPassword?: string;
  loginName: string = '';
  loginPassword: string = '';
  usinName?: string;
  register: boolean = false;
  userData: any = {
    real_name: '',
    emergency: '',
    address: '',
    start_date: new Date(),
    role_id: 0,
    department_id: 0,
  };

  constructor(private userSrv: UserService) { }

  ngOnInit() { }
  
  // NOTE: 確認使用者
  checkUser() {
    if (this.name && this.password && this.checkPassword === this.password) {
      try {
        this.userSrv.checkUser(this.name, this.password).subscribe({
          next: (data) => {
            if (data.status === 200) {
              if (!data.data[0]) {
                this.register = true;
                this.userData['username'] = this.name;
                this.userData['password'] = this.password;
                this.name = '';
                this.password = '';
                this.checkPassword = '';                
              } else {
                // TODO: 跳出提醒視窗
                console.log('使用者已存在');
              }
            } else {
              // TODO: 跳出提醒視窗
              console.log('不明問題');
            }
          },
          error: (error) => {
            // TODO: 跳出提醒視窗
            console.log(`確認失敗：${error.status}`, error.message);
            throw error;
          },
        });
      } catch (err) {
        // TODO: 跳出提醒視窗
        console.error('確認失敗', err);
      }
    } else {
      console.log('請確認帳號、密碼或確認密碼');
    }
  }
  // NOTE: 註冊使用者
  registUser() {
    if (this.userData.username && this.userData.password) {
      try {
        this.userSrv.registUser(this.userData).subscribe({
          next: (data) => {
            if (data.status === 200) {
              // TODO: 跳出提醒視窗
              console.log('註冊成功');
              this.userData = {
                real_name: '',
                emergency: '',
                address: '',
                start_date: new Date(),
                role_id: 0,
                department_id: 0,
              };
              this.register = false;
            } else {
              // TODO: 跳出提醒視窗
              console.log('不明錯誤');
            }
          },
          error: (error) => {
            // TODO: 跳出提醒視窗
            console.log(`註冊失敗：${error.status}`, error.message);
            throw error;
          },
        });
      } catch (err) {
        // TODO: 跳出提醒視窗
        console.error('註冊失敗', err);
      }
    } else {
      // TODO: 彈出提醒視窗
      console.log('請確認帳號或密碼');
    }
  }
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
  // NOTE: 已登入的使用者查看資料
  async getUserInfo() {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        // TODO: 跳出提醒視窗
        console.log('請先登入');
      }
      this.userSrv.getUserInfo(token!).subscribe({
        next: (data) => {
          if (data.status === 200) {
            // TODO: 跳出提醒視窗
            console.log('查詢成功');
            let user: User = data.data[0];
          } else {
            // TODO: 跳出提醒視窗
            console.log('查詢失敗');
          }
        },
        error: (error) => {
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
}

export interface User {
  real_name: string;
  level: number;
  role_id: number;
  department_id: number;
  username: string;
  emergency: string;
  address: string;
  start_date: Date;
  special_date: number;
  special_date_delay: number;
  rank: string;
  regist_date: Date;
}
