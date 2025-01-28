import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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
  // TODO: 使用者查詢資料
}

export interface HttpResult{
    status: number,
    message: string,
    data: Object
  }
