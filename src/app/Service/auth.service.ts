import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User = {
    id: 0,
    username: '',
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
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);
  public currentUser$? = this.currentUserSubject!.asObservable();

  constructor() {}

  loginUser(user: User) {
    this.currentUserSubject.next(user);
  }
  logoutUser() {
    this.currentUserSubject!.next(this.user);
  }
  refreshUser(user: User){
    this.currentUserSubject.next(user);
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

export interface User {
  id: number;
  username: string;
  real_name: string;
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

export enum Roles {
  MANAGER = 1,
  EMPLOYEE = 2,
}

export enum Departments {
  BACKEND = 1,
  FRONTEND = 2,
}
