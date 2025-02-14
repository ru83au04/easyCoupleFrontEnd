import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService, User } from '../../../Service/auth.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-info',
  imports: [MatTableModule],
  template: `
    <main class="container">
      <div class="table-container">
        <table mat-table [dataSource]="userData" class="mat-elevation-z8">
          <!-- 定義列 -->
          <ng-container matColumnDef="property">
            <th class="table-header" mat-header-cell *matHeaderCellDef>項目</th>
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
    </main>
  `,
  styles: [
    `
      .container {
        display: flex;
        height: 100%;
        padding: 20px;
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

      .content{
        width: 400px;
      }
      
    `,
  ],
  providers: [DatePipe],
})
export class UserInfoComponent {
  @ViewChild('infoDetail') infoDetail!: ElementRef;
  userDataChange$!: Observable<User>;
  userName!: string;
  userData: MatTableDataSource<{ property: string; value: string }> = new MatTableDataSource();
  displayedColumns: string[] = ['property', 'value'];

  constructor(private auth: AuthService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.userDataChange$ = this.auth.currentUser$!;

    this.userDataChange$!.subscribe({
      next: user => {
        this.setUserData(user);
      },
      error: err => {
        console.error(err);
      },
    });
  }

  ngAfterViewInit() {}

  setUserData(user: User) {
    this.userData.data = [
      { property: '姓名', value: user.real_name },
      { property: '職務', value: user.role_id.toString() },
      { property: '部門', value: user.department_id.toString() },
      { property: '帳號', value: user.username },
      { property: '緊急聯絡人', value: user.emergency },
      { property: '地址', value: user.address },
      { property: '到職日期', value: this.datePipe.transform(user.start_date, 'yyyy-MM-dd')!.toString() },
      // { property: '特休天數', value: this.currentUser.special_date.toString() },
      // { property: '特休天數延後', value: this.currentUser.special_date_delay.toString() },
    ];
  }
}
