import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../Page/user-system/user-system.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject?: BehaviorSubject<User>;
  public currentUser?: Observable<User>;

  constructor(private userSrv: UserService) { 
    // this.currentUserSubject = new BehaviorSubject<User>(this.userSrv.);
    // this.currentUser = this.currentUserSubject.asObservable();
  }
}
