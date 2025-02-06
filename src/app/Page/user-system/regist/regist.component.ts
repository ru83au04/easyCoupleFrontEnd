import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Roles } from '../../../Service/auth.service';
import { Departments } from '../../../Service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-regist',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent {
  @Output() finishRegist = new EventEmitter<Object>();
  @Output() cancel = new EventEmitter<boolean>();

  roles?: string[];
  departments?: string[];
  checkPassword?: string;
  username = '';
  password = '';
  address = '';
  start_date = new Date();
  role?: any;
  department?: any;
  detail = false;

  basicData = [
    { name: '', type: 'text', placeholder: '真實姓名(必填)'},
    { name: 123456789, type: 'number', placeholder: '電話'},
    { name: '', type: 'text', placeholder: '緊急聯絡人(必填)'},
    { name: 987654321, type: 'number', placeholder: '緊急聯絡人電話'},
  ];

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
      && this.basicData[0].name != ''
      && this.basicData[2].name != '') {
      let userData = {
        username: this.username,
        password: this.password,
        real_name: this.basicData[0].name,
        phone: this.basicData[1].name,
        emergency: this.basicData[2].name,
        emergency_phone: this.basicData[3].name,
        address: this.address,
        start_date: this.start_date,
        role_id: Roles[this.role],
        department_id: Departments[this.department],
      };
      try {
        this.userSrv.registUser(userData).subscribe({
          next: (data) => {
            if (data.status === 200) {
              this.username = '';
              this.password = '';
              this.basicData[0].name = '';
              this.basicData[1].name = 123456789;
              this.basicData[2].name = '';
              this.basicData[3].name = 987654312;
              this.address = '';
              this.start_date = new Date();
              this.role = '';
              this.department = '';
              this.finish(true, '註冊成功');
            } else {
              this.finish(false, '註冊失敗');
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log(`註冊失敗： ${error.status}`, error.error.message);
            this.finish(false, `註冊失敗： ${error.error.message}`);
          },
        });
      } catch (err) {
        this.finish(false, '註冊失敗');
        console.error('註冊失敗', err);
      }
    } else {
      console.log('註冊資料不完整');
      this.finish(false, '註冊資料不完整');
    }
  }

  finish(result: boolean, message: string) {
    this.finishRegist.emit({ result, message });
  }
  cancelRegist(){
    this.cancel.emit(false);
  }
}
