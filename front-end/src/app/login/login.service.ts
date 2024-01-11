import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userId: number = 0;
  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post('http://localhost:3000/auth/login', {
      username,
      password,
    });
  }
  register(username: string, password: string) {
    return this.httpClient.post('http://localhost:3000/', {
      username,
      password,
    });
  }

  token() {
    return localStorage.getItem('token');
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return Number(decodedToken.sub);
  }
}
