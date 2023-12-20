import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service'; // Substitua 'path-to-your-login-service' pelo caminho correto para o seu serviço de login

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  registerUser(username: string, password: string) {
    console.log(username);
    this.loginService.register(username, password).subscribe((res) => {
      this.router.navigate(['/search']);
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
