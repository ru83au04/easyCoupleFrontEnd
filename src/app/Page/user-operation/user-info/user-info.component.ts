import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService, User } from '../../../Service/auth.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  imports: [MatTableModule],
  template: `
    <main class="container">
      <table mat-table [dataSource]="userData" class="mat-elevation-z8">
        <!-- 定義列 -->
        <ng-container matColumnDef="property">
          <th mat-header-cell *matHeaderCellDef>屬性</th>
          <td mat-cell *matCellDef="let element">{{ element.property }}</td>
        </ng-container>

        <ng-container matColumnDef="value">
          <th mat-header-cell *matHeaderCellDef>值</th>
          <td mat-cell *matCellDef="let element">{{ element.value }}</td>
        </ng-container>

        <!-- 標題行 -->
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <!-- 資料行 -->
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </main>
  `,
  styles: [
    `
      .container {
        display: flex;
        height: 100%;
      }
    `,
  ],
})
export class UserInfoComponent {
  @ViewChild('infoDetail') infoDetail!: ElementRef;
  userDataChange: Observable<User> = new Observable<User>();
  currentUser!: User;
  userName!: string;
  userData: MatTableDataSource<{ property: string; value: string }> = new MatTableDataSource();
  displayedColumns: string[] = ['property', 'value'];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.userDataChange = this.auth.currentUser$;
    
    this.auth.currentUser$.subscribe({
      next: user => {
        this.currentUser = user;
        this.setUserData();
      },
      error: err => {
        console.error(err);
      },
    });
  }

  // ngAfterViewInit() {
  //   this.setUserData();
  // }

  setUserData() {
    this.userData.data = [
      { property: '姓名', value: this.currentUser.real_name },
      { property: '角色', value: this.currentUser.role_id.toString() },
      { property: '部門', value: this.currentUser.department_id.toString() },
      { property: '帳號', value: this.currentUser.username },
      { property: '緊急聯絡人', value: this.currentUser.emergency },
      { property: '地址', value: this.currentUser.address },
      { property: '到職日期', value: this.currentUser.start_date.toString() },
      // { property: '特休天數', value: this.currentUser.special_date.toString() },
      // { property: '特休天數延後', value: this.currentUser.special_date_delay.toString() },
    ];
  }
}
