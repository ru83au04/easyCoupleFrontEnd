import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUrl = environment.rootURL;

  constructor(private http: HttpClient) { }
  
  // NOTE: 註冊使用者
  registUser(name: string, password: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        let params = new HttpParams().set('username', name).set('password', password);
        //TEST: 記得刪除
        console.log("前端傳送參數", params);
        const res = this.http.get<boolean>(`${this.rootUrl}/api/user/register`, { params });
        const result = await lastValueFrom(res);
        resolve(result);
      }catch(error){
        reject(error);
      }
    });
  }
}
