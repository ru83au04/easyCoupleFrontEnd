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

  constructor(private userSrv: UserService) { }

  ngOnInit() {
    console.log('User System Page');
  }

  async registUser() {
    if (this.name && this.password) {
      try {
        let res = await this.userSrv.registUser(this.name, this.password);
        if (res) {
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
}
