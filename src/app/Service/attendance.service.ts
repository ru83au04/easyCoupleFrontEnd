import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:3000/api/attendance';

  constructor(private http: HttpClient) { }

  signIn(userId: string, userName: string): Observable<any> {
    console.log("伺服器發出簽到");
    return this.http.post(this.apiUrl, { userId, userName });
  }
}
