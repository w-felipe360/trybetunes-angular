import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service'; // Import LoginService

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private loginService: LoginService) {} // Inject LoginService

 getUser(): Observable<any> {
    const id = this.loginService.getUserId(); // Get user ID from LoginService
    console.log(id);
    return this.http.get(`http://localhost:3000/user/${id}`);
  }
  editUser(user: any): Observable<any> {
    console.log('editUser aqui ->', user);
    const id = this.loginService.getUserId(); // Get user ID from LoginService
    return this.http.patch(`http://localhost:3000/user/${id}`, user);
  }
}
