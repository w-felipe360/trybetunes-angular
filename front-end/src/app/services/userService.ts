import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userId!: string;

  constructor(private http: HttpClient) {}

  fetchUser(): Observable<any> {
    // Replace with the actual URL to fetch the user
    return this.http.get('http://localhost:3000/users/login');
  }

  fetchUserId(): void {
    this.fetchUser().subscribe((user) => {
      this.setUserId(user._id);
    });
  }

  setUserId(id: string) {
    this.userId = id;
  }

  getUserId() {
    return this.userId;
  }
}
