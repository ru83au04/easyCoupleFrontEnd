import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  rootUrl = environment.rootURL;

  constructor(private http: HttpClient) {}

  /** 確認使用者，發送API
   * @param name: string - 使用者名稱
   * @param password: string - 使用者密碼
   * @return Observable<HttpResult> - 回傳HttpResult
   * 回傳 data為 boolean值，帳號已存在為 true、反則 false
   */
  checkUser(name: string, password: string): Observable<HttpResult> {
    let params = new HttpParams().set('username', name).set('password', password);
    return this.http.get<HttpResult>(`${this.rootUrl}/api/user/check`, { params });
  }
  /** 註冊使用者，發送API
   * @param name: string - 使用者名稱
   * @param password: string - 使用者密碼
   * @param user: User - 使用者資料
   * @return Observable<HttpResult> - 回傳HttpResult
   * 回傳 data為陣列 [id, username, role_id, department_id]
   */
  registUser(user: any): Observable<HttpResult> {
    const body = {
      username: user.username,
      password: user.password,
      name: user.real_name,
      emergency: user.emergency,
      address: user.address,
      start_date: user.start_date.toString(),
      role_id: user.role_id,
      department_id: user.department_id,
      phone: user.phone,
      emergency_phone: user.emergency_phone,
    };
    return this.http.post<HttpResult>(`${this.rootUrl}/api/user/register`, body);
  }
  /** 登入使用者，發送API
   * @param name: string - 使用者名稱
   * @param password: string - 使用者密碼
   * @return Observable<HttpResult> - 回傳HttpResult
   * 回傳 data為 Token
   */
  loginUser(name: string, password: string): Observable<HttpResult> {
    const body = {
      username: name,
      password: password,
    };
    return this.http.post<HttpResult>(`${this.rootUrl}/api/user/login`, body);
  }
  logoutUser() {
    sessionStorage.removeItem('easy_couple_token');
  }
  /** 取得使用者資訊，發送API
   * @param token: string - 使用者Token
   * @return Observable<HttpResult> - 回傳HttpResult
   * 回傳 data為 User物件
   */
  getUserInfo(): Observable<HttpResult> {
    let token = sessionStorage.getItem('easy_couple_token');
    // TODO: 未登入時的處理
    if (!token) {
      return new Observable<HttpResult>();
    }
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<HttpResult>(`${this.rootUrl}/api/user/info`, { headers });
  }
  editUserInfo(body: any) {
    let token = sessionStorage.getItem('easy_couple_token');
    // TODO: 未登入時的處理
    if (!token) {
      return new Observable<HttpResult>();
    }
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<HttpResult>(`${this.rootUrl}/api/user/edit`, body, { headers });
  }
  deleteUser(token: string, id: number): Observable<HttpResult> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let params = new HttpParams().set('id', id);
    return this.http.get<HttpResult>(`${this.rootUrl}/api/user/delete`, { headers, params });
  }
}

/* NOTE: 接收會員系統操作的回傳結果
 * status: number - 狀態碼
 * message: string - 訊息
 * data: any[] - 回傳資料
 */
export interface HttpResult {
  status: number;
  message: string;
  data: any[];
}

export interface User {
  id: number;
  username: string;
  real_name: string;
  phone: string;
  emergency: string;
  emergency_phone: string;
  address: string;
  start_date: Date;
  special_date: number;
  special_date_delay: number;
  role_id: number;
  department_id: number;
}

export enum Roles {
  MANAGER = 1,
  EMPLOYEE = 2,
}

export enum Departments {
  BACKEND = 1,
  FRONTEND = 2,
}
