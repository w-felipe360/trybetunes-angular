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
    console.log(username, password);
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
  // setUserId(userId: number) {
  //   console.log('oiiiiiiii', userId);
  //   localStorage.setItem('userId', userId.toString());
  //   console.log(localStorage.getItem('userId') + ' após a alteração.');
  // }

  token() {
    return localStorage.getItem('token');
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log('ID do usuário:', decodedToken.sub);
    return Number(decodedToken.sub);
  }
}
