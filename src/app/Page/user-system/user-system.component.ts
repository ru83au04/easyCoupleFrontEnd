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

  registUser() {
    if (this.name && this.password) {
      try {
        this.userSrv.registUser(this.name, this.password).subscribe({
          next: (data) => {
            console.log(data.status);
            console.log(data.data);
            if (data.status === 200) {
              console.log('註冊成功');
              return;
            } else {
              console.log('不明錯誤');
              return;
            }
          },
          error: (error) => {
            console.log(`註冊失敗：${error.status}`, error.message);
          },
        });
      } catch (err) {
        console.error('註冊失敗', err);
      }
    } else {
      console.log('請輸入帳號or密碼');
    }
  }

  async loginUser() {
    if (this.loginName === '' || this.loginPassword === '') {
      console.log('請輸入帳號or密碼');
      return;
    }
    this.userSrv.loginUser(this.loginName, this.loginPassword).subscribe({
      next: (data) => {
        console.log('最前端OK');
      },
      error: (error) => {
        console.log('最前端不OK');
      },
    });
  }

  async checkData() {
    console.log("查詢廖建構中");
  }
}
