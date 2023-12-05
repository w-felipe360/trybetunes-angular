import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  private USER_KEY = 'user';

  constructor() {}

  private readUser() {
    return JSON.parse(localStorage.getItem(this.USER_KEY) || 'null');
  }

  private saveUser(user: any) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser() {
    let user = this.readUser();
    if (user === null) {
      user = {};
    }
    return of(user).pipe(delay(1500));
  }

  createUser(user: any) {
    const emptyUser = {
      name: '',
      email: '',
      image: '',
      description: '',
    };
    this.saveUser({ ...emptyUser, ...user });
    return of('OK').pipe(delay(1500));
  }

  updateUser(updatedUser: any) {
    this.saveUser({ ...updatedUser });
    return of('OK').pipe(delay(1500));
  }
}
