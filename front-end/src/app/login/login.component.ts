import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

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
