import { Component } from '@angular/core';
import { UserServicesService } from '../services/UserAPI/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private userService: UserServicesService, private router: Router) {}
  createUser(username: string, password: string) {
    this.userService.createUser({ name: username, password: password}).subscribe();
    this.router.navigate(['/search']);
  }
}
