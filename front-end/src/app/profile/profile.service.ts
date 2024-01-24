import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private loginService: LoginService) {}

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
  getUser(): Observable<any> {
    const id = this.loginService.getUserId();
    return this.http.get(`http://localhost:3000/user/${id}`);
  }
  editUser(user: any): Observable<any> {
    const id = this.loginService.getUserId();
    return this.http.patch(`http://localhost:3000/user/${id}`, user);
  }
}
