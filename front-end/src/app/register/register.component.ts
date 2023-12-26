import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  registerUser(username: string, password: string) {
    this.loginService.register(username, password).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error.status === 400 && error.error.message.includes('User already exists')) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User already exists, please make login to proceed',
          });
        }
      }
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
