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
  real_name: string;
  level: number;
  role_id: number;
  department_id: number;
  username: string;
  emergency: string;
  address: string;
  start_date: Date;
  special_date: number;
  special_date_delay: number;
  rank: string;
  regist_date: Date;
}
