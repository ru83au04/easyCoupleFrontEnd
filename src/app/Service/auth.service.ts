import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string;
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
    role_id: 0,
    department_id: 0,
  };
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);
  public currentUser$? = this.currentUserSubject!.asObservable();

  constructor() {}

  loginUser(user: User) {
    this.currentUserSubject.next(user);
    this.token = sessionStorage.getItem('easy_couple_token')!;
  }
  logoutUser() {
    this.currentUserSubject!.next(this.user);
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
  role_id: number;
  department_id: number;
}

export enum Roles {
  MANAGER = 1,
  EMPLOYEE = 2,
}

export enum Departments {
  BACKEND = 1,
  FRONTEND = 2,
}
