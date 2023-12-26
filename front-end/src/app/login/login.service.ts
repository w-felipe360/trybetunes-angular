import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userId: number = 0;
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post('http://localhost:3000/login', {
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
  setUserId(userId: number) {
    console.log('oiiiiiiii', userId);
    localStorage.setItem('userId', userId.toString());
    console.log(localStorage.getItem('userId') + ' após a alteração.');
  }

  getUserId() {
    const userId = localStorage.getItem('userId');
    console.log('foi chamado o ', userId);
    return Number(userId);
  }
}
