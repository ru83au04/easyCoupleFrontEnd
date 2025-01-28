import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { lastValueFrom, Observable, tap, catchError, throwError } from 'rxjs';

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
  loginUser(name: string, password: string): Observable<HttpResult> {
    let params = new HttpParams().set('username', name).set('password', password);
    const res = this.http.get<HttpResult>(`${this.rootUrl}/api/user/login`, { params });
    return res.pipe(
      tap((data) => {
        console.log("tap data", data);
      }),
      catchError((error) => {
        console.log("error", error);
        return throwError(() => error);
      })
    );
  }
  // TODO: 使用者查詢資料
}

interface HttpResult{
    status: number,
    message: string,
    data: Object
  }
