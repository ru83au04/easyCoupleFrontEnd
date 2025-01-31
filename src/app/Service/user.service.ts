import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../Page/user-system/user-system.component'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUrl = environment.rootURL;

  constructor(private http: HttpClient) { }

  /* NOTE: 確認使用者，發送API
    * @param name: string - 使用者名稱
    * @param password: string - 使用者密碼
    * @return Observable<HttpResult> - 回傳HttpResult
    * 回傳 data為 boolean值，帳號已存在為 true、反則 false
  */
  checkUser(name: string, password: string): Observable<HttpResult> {
    let params = new HttpParams().set('username', name).set('password', password);
    return this.http.get<HttpResult>(`${this.rootUrl}/api/user/check`, { params });
  }
  /* NOTE: 註冊使用者，發送API
    * @param name: string - 使用者名稱
    * @param password: string - 使用者密碼
    * @param user: User - 使用者資料
    * @return Observable<HttpResult> - 回傳HttpResult
    * 回傳 data為陣列 [id, username, role_id, department_id]
  */
  registUser(user: any): Observable<HttpResult> {
    let params = new HttpParams()
      .set('username', user.username)
      .set('password', user.password)
      .set('name', user.real_name)
      .set('emergency', user.emergency)
      .set('add', user.address)
      .set('start_date', user.start_date.toString())
      .set('role_id', user.role_id)
      .set('department_id', user.department_id);
    return this.http.get<HttpResult>(`${this.rootUrl}/api/user/register`, { params });       
  }
  /* NOTE: 登入使用者，發送API
    * @param name: string - 使用者名稱
    * @param password: string - 使用者密碼
    * @return Observable<HttpResult> - 回傳HttpResult
    * 回傳 data為 User物件
  */
  loginUser(name: string, password: string): Observable<HttpResult> {
    let params = new HttpParams().set('username', name).set('password', password);
    return this.http.get<HttpResult>(`${this.rootUrl}/api/user/login`, { params });
  }
  /* NOTE: 取得使用者資訊，發送API
    * @param token: string - 使用者Token
    * @return Observable<HttpResult> - 回傳HttpResult
    * 回傳 data為 User物件
  */
  getUserInfo(token: string): Observable<HttpResult> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<HttpResult>(`${this.rootUrl}/api/user/info`, { headers });
  }
}

/* NOTE: 接收會員系統操作的回傳結果
  * status: number - 狀態碼
  * message: string - 訊息
  * data: any[] - 回傳資料
*/
export interface HttpResult{
  status: number,
  message: string,
  data: any[],
}