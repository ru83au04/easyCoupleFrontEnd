import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUrl = environment.rootURL;

  constructor(private http: HttpClient) { }
  
  // NOTE: 註冊使用者
  registUser(name: string, password: string): Observable<HttpResult> {
    let params = new HttpParams().set('username', name).set('password', password);
    return this.http.get<HttpResult>(`${this.rootUrl}/api/user/register`, { params });       
  }
  // NOTE: 登入使用者
  loginUser(name: string, password: string): Observable<HttpResult> {
    let params = new HttpParams().set('username', name).set('password', password);
    return this.http.get<HttpResult>(`${this.rootUrl}/api/user/login`, { params });
  }
  // NOTE: 取得使用者資訊
  getUserInfo(token: string): Observable<HttpResult> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<HttpResult>(`${this.rootUrl}/api/user/info`, { headers });
  }
}

export interface HttpResult{
  status: number,
  message: string,
  data: any[],
}