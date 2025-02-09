import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject?: BehaviorSubject<User>;
  public currentUser?: Observable<User>;

  constructor() { }
  
  loginUser(user: User) {
    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  logoutUser() {
    this.currentUserSubject?.unsubscribe();
    this.currentUser = undefined;
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
