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

  async registUser() {
    if (this.name && this.password) {
      try {
        let res = await this.userSrv.registUser(this.name, this.password);
        if (res) {
          this.name = '';
          this.password = '';
          console.log('註冊成功');
        } else {
          console.log('註冊失敗');
        }
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
    try {
      const res = this.userSrv.loginUser(this.loginName, this.loginPassword);
      console.log('登入成功', res);
    }catch(err){
      console.error("登入失敗", err);
    }
  }

  async checkData() {
    console.log("查詢廖建構中");
  }
}
