import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User = {
    id: 1,
    real_name: '',
    role_id: '',
    department_id: '',
    username: '',
    emergency: '',
    address: '',
    start_date: new Date(),
    special_date: 1,
    special_date_delay: 1,
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
}

export interface User {
  id: number;
  real_name: string;
  role_id: string;
  department_id: string;
  username: string;
  emergency: string;
  address: string;
  start_date: Date;
  special_date: number;
  special_date_delay: number;
}

export enum Roles{
  EMPLOYEE = 1,
  MANAGER = 2,
}

export enum Departments{
  BACK = 1,
  FRONT = 2,
}
