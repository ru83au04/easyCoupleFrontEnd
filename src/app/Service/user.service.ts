import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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
        const res = this.http.get<HttpResponse<boolean>>(`${this.rootUrl}/api/user/register`, { params });
        const result = await lastValueFrom(res);
        if (result.body) {
          resolve(result.body);
        } else {
          reject('註冊失敗');
        }
      }catch(error){
        reject(error);
      }
    });
  }
  // NOTE: 登入使用者
  loginUser(name: string, password: string): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      try {
        let params = new HttpParams().set('username', name).set('password', password);
        const res = this.http.get<HttpResponse<Object>>(`${this.rootUrl}/api/user/login`, { params, observe: 'body' });
        const result = await lastValueFrom(res);
        console.log("result", result);
        console.log("body", result.body);
        console.log("status", result.status);
        console.log('登入成功', res);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  // TODO: 使用者查詢資料
}
