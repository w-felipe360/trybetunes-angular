import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: any  
  constructor(private readonly profileService: ProfileService) {
  }
  ngOnInit() {
    this.profileService.getUser().subscribe((user) => {
      this.user = user;
    });
  }
}
