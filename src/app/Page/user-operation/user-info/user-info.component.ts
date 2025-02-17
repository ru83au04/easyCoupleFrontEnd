import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { AuthService, User } from '../../../Service/auth.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../Service/user.service';
import { AlertService } from '../../../Service/alert.service';

@Component({
  selector: 'app-user-info',
  imports: [MatTableModule, NgIf, FormsModule],
  providers: [DatePipe],
  template: `
    <main class="container">
      <div class="tables" #tables>
        <div class="table-container" *ngIf="!editMode">
          <table mat-table [dataSource]="userData" class="mat-elevation-z8">
            <ng-container matColumnDef="property">
              <th class="table-header index-column" mat-header-cell *matHeaderCellDef>項目</th>
              <td mat-cell *matCellDef="let element">{{ element.property }}</td>
            </ng-container>

            <ng-container matColumnDef="value">
              <th class="table-header content" mat-header-cell *matHeaderCellDef>內容</th>
              <td mat-cell *matCellDef="let element">{{ element.value }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </div>
        <div class="table-container" *ngIf="editMode">
          <table mat-table [dataSource]="userData" class="mat-elevation">
            <ng-container matColumnDef="property">
              <th class="table-header index-column" mat-header-cell *matHeaderCellDef>項目</th>
              <td mat-cell *matCellDef="let element">{{ element.property }}</td>
            </ng-container>

            <ng-container matColumnDef="value">
              <th class="table-header content" mat-header-cell *matHeaderCellDef>內容</th>
              <td mat-cell *matCellDef="let element"><textarea [(ngModel)]="element.value"></textarea></td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </div>
      </div>
      <div class="right-area">
        <div class="info-container">
          <p>部門： {{ currentUser.department }}</p>
          <p>職務： {{ currentUser.role }}</p>
          <p>特休天數： {{ currentUser.special_date }}</p>
          <p>特休天數延後： {{ currentUser.special_date_delay }}</p>
        </div>
        <div class="button-container">
          <button mat-raised-button (click)="editUserInfo()" *ngIf="!editMode">修改資料</button>
          <!-- TODO: 確認邏輯要儲存輸入資料 -->
          <button mat-raised-button color="primary" (click)="finishEdit(true)" *ngIf="editMode">儲存</button>
          <button mat-raised-button color="primary" (click)="finishEdit(false)" *ngIf="editMode">取消</button>
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      .container {
        display: flex;
        height: 100%;
        padding: 30px 50px 50px 100px;
      }

      .tables {
        transform-style: preserve-3d;
        transform: rotateY(0deg);
        transition: transform 1s;
      }

      .table-container table {
        background-color: transparent;
      }

      .table-container table .table-header {
        text-align: center;
        color: var(--text-color);
        background-color: var(--title-color);
        border-radius: 10px;
      }

      td {
        text-align: center;
        color: var(--text-color);
        border-radius: 10px;
      }

      .index-column{
        width: 150px;
      }

      .content {
        width: 400px;
      }

      textarea {
        width: 100%;
        box-sizing: border-box;
        color: var(--text-color);
        text-align: center;
        background-color: transparent;
        border: none;
        outline: none;
      }

      .right-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 20px;
        width: 50%;
      }

      .info-container{
        width: 50%;
      }

      .button-container{
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 50px;
      }

      button {
        border-radius: 20px;
        background-color: var(--block-color);
        padding: 10px;
        margin: 10px;
        font-size: 1.2rem;
      }
    `,
  ],
})
export class UserInfoComponent {
  @ViewChild('tables') tables!: ElementRef;
  userDataChange$!: Observable<User>;
  currentUser: UserInfo = {
    user_name: '',
    real_name: '',
    phone: '',
    emergency: '',
    emergency_phone: '',
    address: '',
    start_date: new Date(),
    special_date: 0,
    special_date_delay: 0,
    role: '',
    department: '',
  };
  editMode: boolean = false;
  userData: MatTableDataSource<{ property: string; value: string }> = new MatTableDataSource();
  displayedColumns: string[] = ['property', 'value'];
  currentAngle = 0;

  constructor(private auth: AuthService, private datePipe: DatePipe, private userSrv: UserService, private alert: AlertService) {}

  ngOnInit() {
    this.userDataChange$ = this.auth.currentUser$!;

    this.userDataChange$!.subscribe({
      next: user => {
        this.currentUser = {
          user_name: user.username,
          real_name: user.real_name,
          phone: user.phone,
          emergency: user.emergency,
          emergency_phone: user.emergency_phone,
          address: user.address,
          start_date: user.start_date,
          special_date: user.special_date,
          special_date_delay: user.special_date_delay,
          role: this.getRole(user.role_id),
          department: this.getDepartment(user.department_id),
        }
        this.setUserData(this.currentUser);
      },
      error: err => {
        console.error(err);
      },
    });
  }

  ngAfterViewInit() {}

  setUserData(user: UserInfo, editMode: boolean = false) {
    if (editMode) {
      this.userData.data = [
        { property: '姓名', value: this.currentUser.real_name },
        { property: '連絡電話', value: this.currentUser.phone},
        { property: '緊急聯絡人', value: this.currentUser.emergency },
        { property: '緊急連絡電話', value: this.currentUser.emergency_phone },
        { property: '地址', value: this.currentUser.address },
      ];
      return;
    }
    this.userData.data = [
      { property: '姓名', value: user.real_name },
      { property: '連絡電話', value: user.phone},
      { property: '職務', value: user.role },
      { property: '部門', value: user.department },
      { property: '帳號', value: user.user_name },
      { property: '緊急聯絡人', value: user.emergency },
      { property: '緊急連絡電話', value: user.emergency_phone },
      { property: '地址', value: user.address },
      { property: '到職日期', value: this.datePipe.transform(user.start_date, 'yyyy-MM-dd')!.toString() },
    ];
  }
  editUserInfo() {
    this.currentAngle -= 360;
    this.tables.nativeElement.style.transform = `rotateY(${this.currentAngle}deg)`;
    this.setUserData(this.currentUser, true);
    this.editMode = true;
  }
  finishEdit(edited: boolean = false) {
    if (edited) {
      this.userData.data.map(data => {
        switch (data.property) {
          case '姓名':
            this.currentUser.real_name = data.value;
            break;
          case '連絡電話':
            this.currentUser.phone = data.value;
            break;
          case '緊急聯絡人':
            this.currentUser.emergency = data.value;
            break;
          case '緊急連絡電話':
            this.currentUser.emergency_phone = data.value;
            break;
          case '地址':
            this.currentUser.address = data.value;
            break;
        }
      });

      this.userSrv.editUserInfo(this.currentUser).subscribe({
        next: data => {
          if(data.status === 200 && data.data.length > 0){
            this.alert.showAlert('修改成功', );
            console.log('修改成功');
          }else{
            console.log('修改失敗');
          }
        },
        error: err => {
          console.error(err);
        }
      });
    }
    this.setUserData(this.currentUser);
    this.currentAngle += 360;
    this.tables.nativeElement.style.transform = `rotateY(${this.currentAngle}deg)`;
    this.editMode = false;
  }
  getRole(role: number): string {
    switch (role) {
      case 1:
        return '主管';
      case 2:
        return '職員';
      default:
        return '未知';
    }
  }
  getDepartment(department: number): string {
    switch (department) {
      case 1:
        return '後端';
      case 2:
        return '前端';
      default:
        return '未知';
    }
  }
}

interface UserInfo{
  user_name: string;
  real_name:string;
  phone: string;
  emergency: string;
  emergency_phone: string;
  address: string;
  start_date: Date;
  special_date: number;
  special_date_delay: number;
  role: string;
  department: string;
}
