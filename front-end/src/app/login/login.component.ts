import { Component } from '@angular/core';
import { UserServicesService } from '../services/UserAPI/user-services.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private userService: UserServicesService,
    private router: Router,
    private loginService: LoginService
  ) {}

  login(username: string, password: string) {
    this.loginService.login(username, password).subscribe({
      next: () => {
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
}
