import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
}
