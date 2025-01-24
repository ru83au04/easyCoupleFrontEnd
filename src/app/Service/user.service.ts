import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  // NOTE: 註冊使用者
  registUser(name: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (name === 'admin' && password === 'admin') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}
