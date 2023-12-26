import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  login(username: string, password: string) {
    this.loginService.login(username, password).subscribe({
      next: (user) => {
        // Save the user ID somewhere, e.g., in a UserService or AuthService
        // console.log('id do user guardado?', user);
        this.loginService.setUserId(user.id);
        this.loginService.getUserId();
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
