import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
// import * as jwt_decode from 'jsonwebtoken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private httpClient: HttpClient
  ) {}

  // login(username: string, password: string) {
  // console.log(username, password); username e password ok
  // this.loginService.login(username, password).subscribe({
  // next: (user) => {
  // Save the user ID somewhere, e.g., in a UserService or AuthService
  // console.log('id do user guardado?', user);
  // this.loginService.setUserId(user.id);
  // this.loginService.getUserId();
  // },

  // },
  // });
  // }
  login(username: string, password: string) {
    return this.httpClient
      .post('http://localhost:3000/auth/login', {
        username,
        password,
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/search']);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid username or password',
          });
        },
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
