import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

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
  level: number;
  role_id: string;
  department_id: string;
  username: string;
  emergency: string;
  address: string;
  start_date: Date;
  special_date: number;
  special_date_delay: number;
  rank: string;
  regist_date: Date;
}

export enum Roles{
  employee = 1,
  manager = 2,
  admin = 3
}

export enum Departments{
  department1 = 1,
  department2 = 2,
  department3 = 3
}
