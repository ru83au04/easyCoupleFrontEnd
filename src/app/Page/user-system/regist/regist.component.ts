import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Roles } from '../../../Service/auth.service';
import { Departments } from '../../../Service/auth.service';

@Component({
  selector: 'app-regist',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent {
  @Output() finishRegist = new EventEmitter<Object>();

  roles?: string[];
  departments?: string[];
  checkPassword?: string;
  username = '';
  password = '';
  real_name = '';
  phone?: number;
  emergency = '';
  emergency_phone?: number;
  address = '';
  start_date = new Date();
  role?: any;
  department?: any;
  detail = false;

  constructor(private userSrv: UserService) {
    this.roles = Object.keys(Roles).filter((item) => isNaN(Number(item)));
    this.departments = Object.keys(Departments).filter((item) => isNaN(Number(item)));
   }

  ngOnInit() { }

  // NOTE: 確認使用者
  checkUser() {
    if (this.username
      && this.password
      && this.checkPassword === this.password) {
      try {
        this.userSrv.checkUser(this.username, this.password).subscribe({
          next: (data) => {
            if (data.status === 200) {
              if (!data.data[0]) {
                this.checkPassword = '';
                this.detail = true;
              } else {
                // TODO: 跳出提醒視窗
                console.log('使用者已存在');
                this.finish(false, '使用者已存在');
              }
            } else {
              // TODO: 跳出提醒視窗
              console.log('不明問題');
              this.finish(false, '不明問題');
            }
          },
          error: (error) => {
            // TODO: 跳出提醒視窗
            console.log(`確認失敗：${error.status}`, error.message);
            this.finish(false, `確認失敗：${error.status}`);
          },
        });
      } catch (err) {
        // TODO: 跳出提醒視窗
        console.error('確認失敗', err);
        this.finish(false, '確認失敗');
      }
    } else {
      console.log('請確認帳號、密碼或確認密碼');
      this.finish(false, '請確認帳號、密碼或確認密碼');
    }
  }
  // NOTE: 註冊使用者
  registUser() {
    if (this.username
      && this.password
      && this.real_name != ''
      && this.emergency != '') {
      let userData = {
        username: this.username,
        password: this.password,
        real_name: this.real_name,
        phone: this.phone,
        emergency: this.emergency,
        emergency_phone: this.emergency_phone,
        address: this.address,
        start_date: this.start_date,
        role_id: Roles[this.role],
        department_id: Departments[this.department],
      };
      try {
        this.userSrv.registUser(userData).subscribe({
          next: (data) => {
            if (data.status === 200) {
              // TODO: 跳出提醒視窗
              console.log('註冊成功');
              this.username = '';
              this.password = '';
              this.real_name = '';
              this.phone = undefined;
              this.emergency = '';
              this.emergency_phone = undefined;
              this.address = '';
              this.start_date = new Date();
              this.role = '';
              this.department = '';
              // TODO: 應該要在通知視窗後執行
              this.finish(true, '註冊成功');
            } else {
              // TODO: 跳出提醒視窗
              this.finish(false, '註冊失敗');
            }
          },
          error: (error) => {
            // TODO: 跳出提醒視窗
            this.finish(false, '註冊失敗：' + error.message);
          },
        });
      } catch (err) {
        // TODO: 跳出提醒視窗
        this.finish(false, '註冊失敗');
        console.error('註冊失敗', err);
      }
    } else {
      // TODO: 彈出提醒視窗
      console.log('註冊資料不完整');
      this.finish(false, '註冊資料不完整');
    }
  }

  finish(result: boolean, message: string) {
    this.finishRegist.emit({ result, message });
  }
}
