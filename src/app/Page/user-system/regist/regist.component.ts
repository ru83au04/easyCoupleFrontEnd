import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { AlertService } from '../../../Service/alert.service';
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
  @Output() close = new EventEmitter<boolean>();

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
    { name: '', type: 'number', placeholder: '電話'},
    { name: '', type: 'text', placeholder: '緊急聯絡人(必填)'},
    { name: '', type: 'number', placeholder: '緊急聯絡人電話'},
  ];

  constructor(private userSrv: UserService, private alert: AlertService) {
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
                this.alert.showAlert('使用者已存在');
              }
            } else {
              // TODO: 跳出提醒視窗
              console.log('不明問題');
              this.alert.showAlert('不明問題');
            }
          },
          error: (error) => {
            // TODO: 跳出提醒視窗
            console.log(`確認失敗：${error.status}`, error.message);
            this.alert.showAlert(`確認失敗：${error.message}`);
          },
        });
      } catch (err) {
        // TODO: 跳出提醒視窗
        console.error('確認失敗', err);
        this.alert.showAlert('確認失敗');
      }
    } else {
      this.alert.showAlert('請確認帳號、密碼');
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
        emergency: this.basicData[2].name,
        address: this.address,
        start_date: this.start_date,
        role_id: Roles[this.role],
        department_id: Departments[this.department],
        phone: this.basicData[1].name,
        emergency_phone: this.basicData[3].name,
      };
      try {
        this.userSrv.registUser(userData).subscribe({
          next: (data) => {
            if (data.status === 200) {
              this.username = '';
              this.password = '';
              this.basicData[0].name = '';
              this.basicData[1].name = '';
              this.basicData[2].name = '';
              this.basicData[3].name = '';
              this.address = '';
              this.start_date = new Date();
              this.role = '';
              this.department = '';
              this.alert.showAlert(`註冊成功：${data.data[0].username}`, () => {
                this.closeRegist()
              });
            } else {
              this.alert.showAlert('註冊失敗');
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log(`註冊失敗： ${error.status}`, error.error.message);
            this.alert.showAlert(`註冊失敗： ${error.error.message}`);
          },
        });
      } catch (err) {
        this.alert.showAlert('註冊失敗');
        console.error('註冊失敗', err);
      }
    } else {
      console.log('註冊資料不完整');
      this.alert.showAlert('註冊資料不完整');
    }
  }
  closeRegist(){
    this.close.emit(false);
  }
}
