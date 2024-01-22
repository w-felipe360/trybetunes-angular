import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // import MatSnackBar here
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  editUser: any; // Add this line
  editMode = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.profileService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  toggleEditMode() {
    if (this.editMode) {
      this.editUser = null;
    } else {
      this.editUser = { ...this.user };
    }
    this.editMode = !this.editMode;
  }

  onSubmit() {
    this.profileService
      .editUser(this.editUser)
      .pipe(
        catchError((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Invalid fields.',
            text: error.error.message,
          });
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.user = this.editUser;
        this.editMode = false;
        this.snackBar.open('User edited successfully', 'Close', {
          duration: 3000,
          panelClass: ['custom-snackbar'],
        });
      });
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
