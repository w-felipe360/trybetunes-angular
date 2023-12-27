import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  editMode = false;

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    this.profileService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onSubmit() {
    this.profileService.editUser(this.user).subscribe((user) => {
      // this.user = user;
      this.editMode = false;
    });
  }
  onLogout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
